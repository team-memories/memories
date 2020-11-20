const { SQLDataSource } = require("datasource-sql");

const CACHE_TTL = 3;

class MediaDB extends SQLDataSource {
  async getMedia(id) {
    return this.knex
      .select("*")
      .first()
      .from("media")
      .where({ id: id, isActive: true })
      .cache(CACHE_TTL);
  }

  async getAttribute(attrName, id) {
    const tableList = ["media", "tag"];
    let index;
    if (!attrName.indexOf("tag")) {
      index = 1;
      attrName = attrName.substring("tag".length).toLowerCase();
    } else index = 0;
    if (attrName == "url" || attrName == "originalUrl" || attrName == "thumbnailUrl") {
      const result = await this.knex
      .select("random", "id", "urlFileExtension", "thumbnailFileExtension", "type", "isConverted")
      .first()
      .from(tableList[index])
      .where({ id: id })
      .cache(CACHE_TTL);
      if (result.isConverted) { //성공
        if (attrName == "url") {
          return `${process.env["AWS_S3URL"]}/${result.random}-${result.id}-enhanced.${result.urlFileExtension}`;
        } else if (attrName == "originalUrl" || (attrName == "thumbnailUrl" && result.type == "PHOTO")) {
          return `${process.env["AWS_S3URL"]}/${result.random}-${result.id}-original.${result.urlFileExtension}`;
        } else {
          return `${process.env["AWS_S3URL"]}/${result.random}-${result.id}-thumbnail.${result.thumbnailFileExtension}`;
        }
      } else { //실패
        if (attrName == "url") {
          return `${process.env["AWS_S3URL"]}/${result.random}-${result.id}-original.${result.urlFileExtension}`;
        } else if (attrName == "originalUrl" || (attrName == "thumbnailUrl" && result.type == "PHOTO")) {
          return `${process.env["AWS_S3URL"]}/${result.random}-${result.id}-original.${result.urlFileExtension}`;
        } else {
          return `${process.env["AWS_S3URL"]}/${result.random}-${result.id}-thumbnail.${result.thumbnailFileExtension}`;
        }
      }
    } else {
      const result = await this.knex
        .select(attrName)
        .first()
        .from(tableList[index])
        .where({ id: id })
        .cache(CACHE_TTL);
      return result[attrName];
    };
  }

  async searchMedia({
    queryStr = "",
    location = "대한민국",
    yearFrom = 1900,
    yearTo = 2100,
  }) {
    const result = await this.knex
      .from("media")
      .leftOuterJoin("tagMediaConnect", "tagMediaConnect.mediaId", "media.id")
      .leftOuterJoin("tag", "tag.id", "tagMediaConnect.tagId")
      .select(
        "media.id as id",
        "media.title as title",
        "media.type as type",
        "media.random as random",
        "media.urlFileExtension as urlFileExtension",
        "media.thumbnailFileExtension as thumbnailFileExtension",
        "media.isConverted as isConverted",
        "media.authorId as authorId",
        "media.location as location",
        "media.year as year",
        "media.description as description",
        "media.isActive as isActive",
        "media.createdAt as createdAt",
        "tag.name as name",
        "tag.id as tagId"
      )
      .where("isActive", true)
      .andWhere(function () {
        // eslint-disable-next-line no-invalid-this
        this.where("title", "like", `%${queryStr}%`)
          .orWhere("description", "like", `%${queryStr}%`)
          .orWhere("tag.name", "like", `%${queryStr}%`);
      })
      .andWhere("location", "like", `${location}%`)
      .andWhereBetween("year", [yearFrom, yearTo])
      .orderBy("createdAt", "desc")
      .cache(CACHE_TTL);
    for (const media of result) {
      if (media.isConverted) {
        media["url"] = `${process.env["AWS_S3URL"]}/${media.random}-${media.id}-enhanced.${media.urlFileExtension}`;
      } else {
        media["url"] = `${process.env["AWS_S3URL"]}/${media.random}-${media.id}-original.${media.urlFileExtension}`;
      };
      media["originalUrl"] = `${process.env["AWS_S3URL"]}/${media.random}-${media.id}-original.${media.urlFileExtension}`;
      if (media.type == "VIDEO") {
        media["thumbnailUrl"] = `${process.env["AWS_S3URL"]}/${media.random}-${media.id}-thumbnail.${media.thumbnailFileExtension}`;
      } else {
        media["thumbnailUrl"] = media["originalUrl"];
      };
    };
    return result;
  }

  async createMedia(args) {
    let media;
    try {
      await this.knex.transaction(async (trx) => {
        media = await this.knex
          .insert({ ...args, random: "" })
          .into("media")
          .returning("*")
          .first()
          .transacting(trx);
        await this.knex
          .insert({ id: media["id"] })
          .into("media_under_processing")
          .transacting(trx);
      });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to create media. check the log");
    }
    return media;
  }

  async completeProcessing(id, random, urlFileExtension, thumbnailFileExtension, isConverted, title) {
    // validate
    if (await this.isUnderProcessing(id)) {
      throw Error("Already processed media");
    }

    try {
      await this.knex.transaction(async (trx) => {
        const deleteFromMediaUnderProcessingTable = this.knex("media_under_processing")
          .where("id", id)
          .delete()
          .transacting(trx);
        const updateMedia = this.knex("media")
          .where({ id })
          .update({ random, urlFileExtension, thumbnailFileExtension, isConverted, title })
          .transacting(trx);
        await deleteFromMediaUnderProcessingTable;
        await updateMedia;
      });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to create media. check the log");
    }
  }

  async isUnderProcessing(id) {
    return !!(await this.knex("media_under_processing").where({ id }).length);
  }

  async updateMedia(id, args) {
    return this.knex("media").where({ id }).update(args);
  }

  async deleteMedia(id) {
    await this.knex("media").where({ id }).update("isActive", false);
    return true;
  }

  async getMediaByAuthorId(id) {
    // id: 유저의 고유 id
    // 해당 유저가 올린 모든 미디어를 반환한다.
    return this.knex("media")
      .where({ authorId: id, isActive: true })
      .orderBy("createdAt", "desc")
      .cache(CACHE_TTL);
  }

  async getTags() {
    return this.knex("tag").select("*");
  }

  async getTagIdsByMediaId(mediaId) {
    return this.knex
      .from("tagMediaConnect")
      .select("tagId as id")
      .where({ mediaId: mediaId })
      .orderBy("mediaId", "desc")
      .cache(CACHE_TTL);
  }

  async modifyTagMediaConnect(tagNames, mediaId) {
    try {
      await this.knex.transaction(async (trx) => {
        const result = [];
        for (const tagName of tagNames) {
          let tags = await trx("tag").where({ name: tagName });
          if (!tags.length) { // 등록된 tag가 아니라면 tag먼저 추가하기
            tags = await trx("tag").insert({ name: tagName }, ["id"]);
          }
          result.push({ tagId: tags[0]["id"], mediaId: mediaId });
        }
        const existMedia = await this.knex("tagMediaConnect").where({ mediaId: mediaId }).transacting(trx);
        if (existMedia.length) { // tagMediaConnect 테이블에 존재하던 미디어라면 수정을 하는 것, 존재하지 않았다면 새로 추가하는 것.
          await this.knex("tagMediaConnect").where({ mediaId: mediaId }).del().transacting(trx);
        }
        await this.knex("tagMediaConnect").insert(result).transacting(trx);
      });
    } catch (error) {
      console.log(error);
      throw new Error("Fail to modifyTagMediaConnect");
    }
  }

  async getTagIdByTagName(tagName) {
    return this.knex("tag").where({ name: tagName }).select("id");
  }

  async searchTag({ queryStr = "" }) {
    return this.knex
      .from("tag")
      .select("id", "name")
      .where("name", "like", `%${queryStr}%`)
      .cache(CACHE_TTL);
  }
}

class UserDB extends SQLDataSource {
  async getAttribute(attrName, id) {
    const result = await this.knex
      .select(attrName)
      .first()
      .from("user")
      .where({ id })
      .cache(CACHE_TTL);
    return result[attrName];
  }

  async createUser({ email, password, name }) {
    const result = await this.knex
      .insert({ email, password, name })
      .into("user")
      .returning("*");
    return result[0];
  }

  async getUserByEmail(email) {
    return this.knex.select("*").first().from("user").where({ email });
  }

  async getUser(id) {
    console.log(id);
    return this.knex
      .select("*")
      .first()
      .from("user")
      .where({ id: id, isActive: true })
      .cache(CACHE_TTL);
  }

  async deactivateUser(id) {
    await this.knex("user").where({ id }).update({ isActive: false, name: "알 수 없음" });
    return true;
  }
}

class CommentDB extends SQLDataSource {
  async getComment(id) {
    return this.knex
      .select("*")
      .first()
      .from("comment")
      .where({ id: id, isActive: true })
      .cache(CACHE_TTL);
  }

  async getAttribute(attrName, id) {
    const result = await this.knex
      .select(attrName)
      .from("comment")
      .where({ id: id, isActive: true })
      .orderBy("createdAt", "desc")
      .cache(CACHE_TTL);
    return result[0][attrName];
  }

  async getCommentIdsByAuthorId(id) {
    return this.knex.from("comment").where({ authorId: id }).cache(CACHE_TTL);
  }

  async getCommentIdsByMediaId(id) {
    return this.knex
      .from("comment")
      .where({ mediaId: id, isActive: true })
      .orderBy("id", "desc")
      .cache(CACHE_TTL);
  }

  async createComment({ mediaId, authorId, content }) {
    const result = await this.knex
      .insert({ mediaId, authorId, content })
      .into("comment")
      .returning("*");
    return result[0];
  }

  async updateComment(id, args) {
    return this.knex("comment").where({ id }).update(args);
  }

  async deleteComment(id) {
    await this.knex("comment").where({ id }).update({ isActive: false });
    return true;
  }
}

module.exports = {
  MediaDB,
  UserDB,
  CommentDB,
};
