const shortid = require("shortid");
const AWS = require("aws-sdk");

const ID = process.env["AWS_ACCESS_KEY_ID"];
const SECRET = process.env["AWS_SECRET_ACCESS_KEY"];
const BUCKET_NAME = process.env["AWS_S3_MEDIA_DATA_BUCKET_NAME"];

AWS.config.update({ region: process.env["AWS_REGION"] });
const s3 = new AWS.S3({
  accessKeyId: ID,
  secretAccessKey: SECRET,
}); 

exports.up = async function(knex) {
  await knex.schema.table("media", function(table){
    table.text("random");
    table.boolean("convert").notNullable().defaultTo(true);
    table.text("urlFileExtension");
    table.text("thumbnailFileExtension");
  });

  const result = await knex("media").select("id", "url", "originalUrl", "thumbnailUrl", "type");

  for (const media of result) {
    let copyUrlName = media.url.split("/").pop();
    let copyOriginalName = media.originalUrl.split("/").pop();
    let copyThumbnailName = media.thumbnailUrl.split("/").pop();

    let id = shortid.generate();
    let urlFileExtension = media.url.split(".").pop();
    let thumbnailFileExtension = media.thumbnailUrl.split(".").pop();
    let newFileName = `${id}-${media.id}`;
    
    await knex("media").update({
      random: id,
      urlFileExtension: urlFileExtension,
      thumbnailFileExtension: thumbnailFileExtension
    }).where({id: media.id});

    console.log(`복사 시작 random: ${id}, copyUrlName: ${copyUrlName}, newFileName: ${newFileName}.${urlFileExtension}, mediaId: ${media.id}`)
    try {
      await s3
      .copyObject({ //url 파일 이름 변경
        Bucket: BUCKET_NAME,
        CopySource: `${BUCKET_NAME}/${copyUrlName}`,
        Key: `${newFileName}-enhanced.${urlFileExtension}`,
        ACL: "public-read"
      })
      .promise()
    } catch (err) {
      console.log(`${media.id}에서 url 변경 중 Error, copyUrLName: ${copyUrlName}`)
      await knex("media").where({ id: media.id }).del()
      continue;
    }
    
    console.log(`삭제 시작 random: ${id}, copyUrlName: ${copyUrlName}, newFileName: ${newFileName}.${urlFileExtension}, mediaId: ${media.id}`)
    try {
      await s3.deleteObject({ //기존 url 파일 삭제
        Bucket: BUCKET_NAME,
        Key: copyUrlName
      })
      .promise()
    } catch {
      console.log(`${media.id}에서 기존 url파일 삭제 중 Error, copyUrLName: ${copyUrlName}`)
      await knex("media").where({ id: media.id }).del()
      continue;
    }

    console.log(`복사 시작 random: ${id}, copyOriginalName: ${copyOriginalName}, newFileName: ${newFileName}-original.${urlFileExtension}, mediaId: ${media.id}`)
    try {
      await s3
      .copyObject({ //기존 originalUrl 파일 이름 변경
        Bucket: BUCKET_NAME,
        CopySource: `${BUCKET_NAME}/${copyOriginalName}`,
        Key: `${newFileName}-original.${urlFileExtension}`,
        ACL: "public-read"
      })
      .promise()
    } catch {
      console.log(`${media.id}에서 기존 OriginalUrl파일 변경 중 Error, copyOriginalName: ${copyOriginalName}`)
      await knex("media").where({ id: media.id }).del()
      continue;
    }

    console.log(`삭제 시작 random: ${id}, copyOriginalName: ${copyOriginalName}, newFileName: ${newFileName}-original.${urlFileExtension}, mediaId: ${media.id}`)
    try {
      await s3
      .deleteObject({ // 기존 originalUrl 파일 삭제
        Bucket: BUCKET_NAME,
        Key: copyOriginalName
      })
      .promise()
    } catch {
      console.log(`${media.id}에서 기존 OriginalUrl파일 삭제 중 Error, copyOriginalName: ${copyOriginalName}`)
      await knex("media").where({ id: media.id }).del()
      continue;
    }

    if (media.type == "VIDEO") {
      console.log(`복사 시작 random: ${id}, copyThumbnailName: ${copyThumbnailName}, newFileName: ${newFileName}-thumbnail.${urlFileExtension}, mediaId: ${media.id}`)
      try {
        await s3
        .copyObject({ //기존 thumbnailUrl 파일 이름 변경
          Bucket: BUCKET_NAME,
          CopySource: `${BUCKET_NAME}/${copyThumbnailName}`,
          Key: `${newFileName}-thumbnail.${thumbnailFileExtension}`,
          ACL: "public-read"
        })
        .promise()
      } catch {
        console.log(`${media.id}에서 기존 thumbnail파일 변경 중 Error, copyThumbnailName: ${copyThumbnailName}`)
        await knex("media").where({ id: media.id }).del()
        continue;
      }
      console.log(`삭제 시작 random: ${id}, copyThumbnailName: ${copyThumbnailName}, newFileName: ${newFileName}-thumbnail.${urlFileExtension}, mediaId: ${media.id}`)
      try {
        await s3
        .deleteObject({ //기존 thumbnail 파일 삭제
          Bucket: BUCKET_NAME,
          Key: copyThumbnailName
        })
        .promise()
      } catch {
        console.log(`${media.id}에서 기존 thumbnailUrl파일 삭제 중 Error, copyThumbnailName: ${copyThumbnailName}`)
        await knex("media").where({ id: media.id }).del()
        continue;
      }
    }
  }

  await knex.schema.table("media", function(table){
    table.text("random").notNullable().alter();
    table.text("urlFileExtension").notNullable().alter();
    table.text("thumbnailFileExtension").notNullable().alter();
  });

  await knex.schema.table("media", function(table){
    table.dropColumn("url");
    table.dropColumn("originalUrl");
    table.dropColumn("thumbnailUrl");
  });
};

exports.down = async function(knex) {
  await knex.schema.table("media", function(table){
    table.text("url");
    table.text("originalUrl");
    table.text("thumbnailUrl");
  });

  const result = await knex("media").select("id", "random", "convert", "type", "urlFileExtension", "thumbnailFileExtension");

  for (const media of result) {
    let fileName = `${media.random}-${media.id}`;
    if (media.convert) {
      if (media.type == "VIDEO") { //성공 and video
        await knex("media").update({
          url: `${process.env["AWS_S3URL"]}/${fileName}-enhanced.${media.urlFileExtension}`,
          originalUrl: `${process.env["AWS_S3URL"]}/${fileName}-original.${media.urlFileExtension}`,
          thumbnailUrl: `${process.env["AWS_S3URL"]}/${fileName}-thumbnail.${media.thumbnailFileExtension}`
        }).where({ id: media.id });
      } else { //성공 and photo
        await knex("media").update({
          url: `${process.env["AWS_S3URL"]}/${fileName}-enhanced.${media.urlFileExtension}`,
          originalUrl: `${process.env["AWS_S3URL"]}/${fileName}-original.${media.urlFileExtension}`,
          thumbnailUrl: `${process.env["AWS_S3URL"]}/${fileName}-original.${media.thumbnailFileExtension}`
        }).where({ id: media.id });
      }
    } else { 
      if (media.type == "Video") { //실패 and video
        await knex("media").update({
          url: `${process.env["AWS_S3URL"]}/${fileName}-original.${media.urlFileExtension}`,
          originalUrl: `${process.env["AWS_S3URL"]}/${fileName}-original.${media.urlFileExtension}`,
          thumbnailUrl: `${process.env["AWS_S3URL"]}/${fileName}-thumbnail.${media.thumbnailFileExtension}`
        }).where({ id: media.id });
      } else { //실패 and photo
        await knex("media").update({
          url: `${process.env["AWS_S3URL"]}/${fileName}-original.${media.urlFileExtension}`,
          originalUrl: `${process.env["AWS_S3URL"]}/${fileName}-original.${media.urlFileExtension}`,
          thumbnailUrl: `${process.env["AWS_S3URL"]}/${fileName}-original.${media.thumbnailFileExtension}`
        }).where({ id: media.id });
      }
    }
  };

  await knex.schema.table("media", function(table){
    table.text("url").notNullable().alter();
    table.text("originalUrl").notNullable().alter();
    table.text("thumbnailUrl").notNullable().alter();
  });

  await knex.schema.table("media", function(table){
    table.dropColumn("random");
    table.dropColumn("urlFileExtension");
    table.dropColumn("thumbnailFileExtension");
    table.dropColumn("convert");
  });
};
