"use strict";
const { createWriteStream, unlink } = require("fs");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const shortid = require("shortid");
const AWS = require("aws-sdk");
const axios = require("axios");

const { mediaTypes } = require("./enums");

const ID = process.env["AWS_ACCESS_KEY_ID"];
const SECRET = process.env["AWS_SECRET_ACCESS_KEY"];
const BUCKET_NAME = process.env["AWS_S3_MEDIA_DATA_BUCKET_NAME"];
console.log(`----------------------------------
AWS_ACCESS_KEY_ID: ${ID}
AWS_SECRET_ACCESS_KEY: ${SECRET}
----------------------------------
`);

AWS.config.update({ region: "ap-northeast-2" });
const s3 = new AWS.S3({
  accessKeyId: ID,
  secretAccessKey: SECRET,
});

const MEDIA_PATH = process.env["MEDIA_PATH"];

function extractMediaTypeFromMIMEType(MIMEType) {
  let type;
  if (MIMEType.includes("image")) {
    type = mediaTypes.photo;
  } else if (MIMEType.includes("video")) {
    type = mediaTypes.video;
  } else {
    console.error("Unsupported mimetype");
    throw new Error("Unsupported mimetype");
  }
  console.log(`mimetype: ${type}`);
  return type;
}

async function writeFileToPath(readStream, path) {
  return new Promise((resolve, reject) => {
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
    readStream.on("error", (error) => writeStream.destroy(error));

    readStream.pipe(writeStream);
  });
}

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
    const type = extractMediaTypeFromMIMEType(mimetype);

    console.log(`[Enhance/uploadMedia] Received a media file.
    user id: ${userId}
    user name: ${await userDB.getAttribute("name", userId)}
    file name: ${filename}
    type: ${type}
    `);

    // create a record to media table in order to get id
    const createdMedia = await mediaDB.createMedia({
      title,
      description,
      year,
      location,
      type,
      category,
      authorId: userId,
    });

    const stream = createReadStream();

    const mediaId = createdMedia.id;
    console.log("Media record was created. ID is " + mediaId);

    const id = shortid.generate();
    const fileExtension = filename.split(".").pop();
    const uniqueFileName = `${id}-${mediaId}.${fileExtension}`;
    const path = `${MEDIA_PATH}/${uniqueFileName}`;

    console.log(`Unique file name of ${filename} is ${uniqueFileName}`);
    await writeFileToPath(stream, path);

    const URL_EXT = type === mediaTypes.photo ? "/v1/enhance/photo" : "/v1/enhance/video";
    axios
      .post(`http://${process.env["MEDIA_QUALITY_ENHANCEMENT_SERVICE_ADDR"]}${URL_EXT}`, {
        file_name: `${uniqueFileName}`,
      })
      .then(async (response) => {
        console.log(`${uniqueFileName} Enhancement Complete! This is the response data from Media Enhancement Service
        ${JSON.stringify(response.data)}`);

        const originalFile = fs.readFileSync(response.data["originalFilePath"]);
        const originalUrl = `https://memories-media-data.s3.ap-northeast-2.amazonaws.com/${uniqueFileName}`;
        await s3
          .upload({
            Bucket: BUCKET_NAME,
            Key: `${uniqueFileName}`,
            Body: originalFile,
            ACL: "public-read",
          })
          .promise();

        if (type === mediaTypes.video) {
          const thumbnailFile = fs.readFileSync(response.data["thumbnailFilePath"]);
          await s3
            .upload({
              Bucket: BUCKET_NAME,
              Key: `${id}-thumbnail.png`,
              Body: thumbnailFile,
              ACL: "public-read",
            })
            .promise();
        }
        let thumbnailUrl;
        if (type === mediaTypes.video) {
          thumbnailUrl = `https://memories-media-data.s3.ap-northeast-2.amazonaws.com/${id}-thumbnail.png`;
        } else {
          thumbnailUrl = originalUrl;
        }

        if (response.data["isOriginal"]) {
          await mediaDB.completeProcessing(mediaId, {
            originalUrl,
            thumbnailUrl,
            url: originalUrl,
            title: "[Original] " + title,
          });
          return;
        }

        const enhancedFile = fs.readFileSync(response.data["enhancedFilePath"]);
        const enhancedUrl = `https://memories-media-data.s3.ap-northeast-2.amazonaws.com/${id}-enhanced-${uniqueFileName}`;
        await s3
          .upload({
            Bucket: BUCKET_NAME,
            Key: `${id}-enhanced-${uniqueFileName}`,
            Body: enhancedFile,
            ACL: "public-read",
          })
          .promise();

        await mediaDB.completeProcessing(mediaId, {
          originalUrl,
          thumbnailUrl,
          url: enhancedUrl,
        });
      })
      .catch(async function (error) {
        console.log(`Something bad happened in Media Enhancement Service.
            Media ${mediaId} was not enhanced`);
        const originalFile = fs.readFileSync(path);
        await s3
          .upload({
            Bucket: BUCKET_NAME,
            Key: `${uniqueFileName}`,
            Body: originalFile,
            ACL: "public-read",
          })
          .promise();
        const originalUrl = `https://memories-media-data.s3.ap-northeast-2.amazonaws.com/${uniqueFileName}`;

        await mediaDB.completeProcessing(mediaId, {
          originalUrl,
          thumbnailUrl: originalUrl,
          url: originalUrl,
          title: "[Original] " + title,
        });
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
  createComment: async (_, { mediaId, content }, { userId, dataSources: { commentDB } }) => {
    if (!userId) {
      throw new Error("Login required");
    }
    const comment = await commentDB.createComment({
      authorId: userId,
      mediaId,
      content,
    });

    return comment;
  },
  modifyComment: async (_, { id, content }, { userId, dataSources: { commentDB } }) => {
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
      content,
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
  deactivateUser: async (_, { id }, { userId, dataSources: {userDB } }) => {
    if (!userId) {
      throw new Error("Login required");
    }
    const user = await userDB.getUser(id);
    if (!user) {
      throw new Error("User not found");
    }
    if (userId !== user.id) {
      throw new Error("You are not the User of the account")
    }
    if (!await userDB.deactivateUser(id)) {
      throw new Error("Cannot deactivate the account");
    }
    return user;
  },
};
