"use strict";
const { createWriteStream, unlink } = require("fs");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const shortid = require("shortid");
const AWS = require("aws-sdk");
const axios = require("axios");

AWS.config.update({ region: "ap-northeast-2" });
const ID = process.env["AWS_ACCESS_KEY_ID"];
const SECRET = process.env["AWS_SECRET_ACCESS_KEY"];
console.log(`----------------------------------
AWS_ACCESS_KEY_ID: ${ID}
AWS_SECRET_ACCESS_KEY: ${SECRET}
----------------------------------
`);

const BUCKET_NAME = "memories-media-data";

const s3 = new AWS.S3({
  accessKeyId: ID,
  secretAccessKey: SECRET,
});

const MEDIA_PATH = "/media_data";
module.exports = {
  uploadMedia: async (
    _,
    { media, title, location, year, description, category },
    { dataSources: { mediaDB, userDB }, userId }
  ) => {

    if (!userId) {
      throw new Error("Login required");
    }
    const { createReadStream, filename, mimetype } = await media;

    console.log(`[Enhance] Received a media file.
    user id: ${userId}
    user name: ${await userDB.getAttribute("name", userId)}
    file name: ${filename} 
    `);

    let type = "";
    if (mimetype.includes("image")) {
      type = "PHOTO";
    } else if (mimetype.includes("video")) {
      type = "VIDEO";
    } else {
      console.log("Unsupported mimetype");
      throw new Error("Unsupported mimetype");
    }
    console.log(`mimetype: ${type}`);

    const stream = createReadStream();
    const id = shortid.generate();
    // TODO(yun-kwak) 파일 이름에 공백있으면 문제가 발생한다. uniqueFileName 으로 실제 사용자로부터 받은 이름을 사용하지 않도록 바꾸기
    const uniqueFileName = `${id}-${filename}`;
    const path = `${MEDIA_PATH}/${uniqueFileName}`;

    console.log(`Unique file name of ${filename} is ${uniqueFileName}`)

    await new Promise((resolve, reject) => {
      const writeStream = createWriteStream(path);

      writeStream.on("finish", resolve);

      writeStream.on("error", (error) => {
        unlink(path, () => {
          reject(error);
        });
      });

      // In node <= 13, errors are not automatically propagated between piped
      // streams. If there is an error receiving the upload, destroy the write
      // stream with the corresponding error.
      stream.on("error", (error) => writeStream.destroy(error));

      stream.pipe(writeStream);
    });

    // DB에 저장
    const createdMedia = await mediaDB.createMedia({
      title,
      description,
      year,
      location,
      type,
      category,
      originalUrl: "",
      thumbnailUrl: "",
      url: "",
      authorId: userId,
      isProcessing: true,
    });
    const mediaId = createdMedia.id;
    console.log("Media record was created. ID is " + mediaId);

    const URL_EXT =
      type === "PHOTO" ? "/v1/enhance/photo" : "/v1/enhance/video";
    axios
      .post(
        `http://${process.env["MEDIA_QUALITY_ENHANCEMENT_SERVICE_ADDR"]}${URL_EXT}`,
        { file_name: `${uniqueFileName}` }
      )
      .then(async (response) => {
        console.log(`${uniqueFileName} Enhancement Complete! This is the response data from Media Enhancement Service
        ${JSON.stringify(response.data)}`);
        const originalFile = fs.readFileSync(response.data["originalFilePath"]);
        await s3
          .upload({
            Bucket: BUCKET_NAME,
            Key: `${uniqueFileName}`,
            Body: originalFile,
            ACL: "public-read",
          })
          .promise();

        const enhancedFile = fs.readFileSync(response.data["enhancedFilePath"]);
        await s3
          .upload({
            Bucket: BUCKET_NAME,
            Key: `${id}-enhanced-${filename}`,
            Body: enhancedFile,
            ACL: "public-read",
          })
          .promise();

        if (type === "VIDEO") {
          const thumbnailFile = fs.readFileSync(
            response.data["thumbnailFilePath"]
          );
          await s3
            .upload({
              Bucket: BUCKET_NAME,
              Key: `${id}-thumbnail.png`,
              Body: thumbnailFile,
              ACL: "public-read",
            })
            .promise();
        }
        const originalUrl = `https://memories-media-data.s3.ap-northeast-2.amazonaws.com/${uniqueFileName}`;
        const enhancedUrl = `https://memories-media-data.s3.ap-northeast-2.amazonaws.com/${id}-enhanced-${filename}`;
        let thumbnailUrl;
        if (type === "VIDEO") {
          thumbnailUrl = `https://memories-media-data.s3.ap-northeast-2.amazonaws.com/${id}-thumbnail.png`;
        } else {
          thumbnailUrl = originalUrl;
        }

        await mediaDB.updateMedia(mediaId, {
          originalUrl,
          thumbnailUrl,
          url: enhancedUrl,
          isProcessing: false,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    return createdMedia;
  },
  modifyMedia: async (
    _,
    { id, title, location, year, description, category },
    { userId, dataSources: { mediaDB } }
  ) => {
    const media = await mediaDB.getMedia(id);
    if (!userId) {
      throw new Error("Login required");
    }
    if (!media) {
      throw new Error("Media not found");
    }
    if (userId !== media.authorId) {
      throw new Error("You are not the author of the media");
    }
    await mediaDB.updateMedia(id, {
      title,
      location,
      year,
      description,
      category,
    });
    return {
      id,
    };
  },
  deleteMedia: async (_, { id }, { userId, dataSources: { mediaDB } }) => {
    const media = await mediaDB.getMedia(id);
    if (!userId) {
      throw new Error("Login required");
    }
    if (!media) {
      throw new Error("Media not found");
    }
    if (userId !== media.authorId) {
      throw new Error("You are not the author of the media");
    }
    await mediaDB.deleteMedia(id);
    return media;
  },
  signUp: async (_, { email, password, name }, { dataSources: { userDB } }) => {
    const hashedPassword = await bcrypt.hash(password, 3);
    const user = await userDB.createUser({
      email,
      password: hashedPassword,
      name,
    });
    const token = jwt.sign({ userId: user.id }, process.env.SECRET);

    return {
      token,
      user,
    };
  },
  signIn: async (_, args, { dataSources: { userDB } }) => {
    const { password, ...user } = await userDB.getUserByEmail(args.email);
    if (!user) {
      throw new Error("No such user found");
    }
    const valid = await bcrypt.compare(args.password, password);
    if (!valid) {
      throw new Error("Invalid password");
    }

    const token = jwt.sign({ userId: user.id }, process.env.SECRET);
    return {
      token,
      user,
    };
  },
  createComment: async (
    _,
    { mediaId, body },
    { userId, dataSources: { commentDB } }
  ) => {
    if (!userId) {
      throw new Error("Login required");
    }
    const comment = await commentDB.createComment({
      authorId: userId,
      mediaId,
      body,
    });

    return comment;
  },
  modifyComment: async (
    _,
    { id, body },
    { userId, dataSources: { commentDB } }
  ) => {
    const comment = await commentDB.getComment(id);
    if (!userId) {
      throw new Error("Login required");
    }
    if (!comment) {
      throw new Error("Media not found");
    }
    if (userId !== comment.authorId) {
      throw new Error("You are not the author of the comment");
    }
    await commentDB.updateComment(id, {
      body,
    });
    return {
      id,
    };
  },
  deleteComment: async (_, { id }, { userId, dataSources: { commentDB } }) => {
    if (!userId) {
      throw new Error("Login required");
    }
    const comment = await commentDB.getComment(id);
    if (!comment) {
      throw new Error("Comment not found");
    }
    if (userId !== comment.authorId) {
      throw new Error("You are not the author of the comment");
    }
    if ((await commentDB.deleteComment(id)) !== true) {
      throw new Error("Cannot delete the comment");
    }

    // Success
    return comment;
  },
};
