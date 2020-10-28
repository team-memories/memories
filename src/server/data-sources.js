const { SQLDataSource } = require("datasource-sql");

const CACHE_TTL = 3;

class MediaDB extends SQLDataSource {
  async getMedia(id) {
    return this.knex
      .select("*")
      .first()
      .from("media")
      .where({ id })
      .cache(CACHE_TTL);
  }

  async getAttribute(attrName, id) {
    const tableList = ["media", "tag"]
    let index;
    if(!attrName.indexOf("tag")) {
      index = 1;
      attrName = attrName.substring("tag".length).toLowerCase();
    }
    else index = 0;
    const result = await this.knex
      .select(attrName)
      .first()
      .from(tableList[index])
      .where({ id })
      .cache(CACHE_TTL);
    return result[attrName];
  }

  async searchMedia({
    queryStr = "",
    location = "대한민국",
    yearFrom = 1900,
    yearTo = 2100,
  }) {
    return this.knex
      .from("media")
      .join("tagMediaConnect", "tagMediaConnect.mediaId", "media.id")
      .join("tag", "tag.id", "tagMediaConnect.tagId")
      .select(
        "media.id as id",
        "media.title as title",
        "media.type as type",
        "media.thumbnailUrl as thumbnailUrl",
        "media.originalUrl as originalUrl",
        "media.url as url",
        "media.authorId as authorId",
        "media.location as location",
        "media.year as year",
        "media.description as description",
        "media.isProcessing as isProcessing",
        "tag.name as name",
        "tag.id as tagId"
      )
      .where(function () {
        // eslint-disable-next-line no-invalid-this
        this.where("title", "like", `%${queryStr}%`)
          .orWhere("description", "like", `%${queryStr}%`)
          .orWhere("tag.name", "like", `%${queryStr}%`);
      })
      .andWhere("location", "like", `${location}%`)
      .andWhereBetween("year", [yearFrom, yearTo])
      .cache(CACHE_TTL);
  }

  async createMedia(args) {
    const result = await this.knex.insert(args).into("media").returning("*");
    return result[0];
  }

  async updateMedia(id, args) {
    return this.knex("media").where({ id }).update(args);
  }

  async deleteMedia(id) {
    await this.knex("media").where({ id }).del();
    return true;
  }

  async getMediaByAuthorId(id) {
    // id: 유저의 고유 id
    // 해당 유저가 올린 모든 미디어를 반환한다.
    return this.knex("media").where({ authorId: id }).cache(CACHE_TTL);
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
        for(const tagName of tagNames) {
          let tags = await trx("tag").where({ name: tagName });
          if(!tags.length) { //등록된 tag가 아니라면 tag먼저 추가하기
            tags = await trx("tag").insert({ name: tagName },["id"]);
          }
          result.push({ "tagId": tags[0]["id"], "mediaId": mediaId });
        }
        const existMedia = await this.knex("tagMediaConnect").where({ mediaId: mediaId }).transacting(trx);
        if(existMedia.length) { //tagMediaConnect 테이블에 존재하던 미디어라면 수정을 하는 것, 존재하지 않았다면 새로 추가하는 것.
          await this.knex("tagMediaConnect").where({ mediaId: mediaId }).del().transacting(trx);
        }
        await this.knex("tagMediaConnect").insert(result).transacting(trx);
      });
    } catch(error) {
      console.log(error);
      throw new Error("Fail to modifyTagMediaConnect")
    }
  }

  async getTagIdByTagName(tagName) {
    return this.knex("tag").where({ name: tagName }).select("id");
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

  async deactivateUser(id) {
    await this.knex("user").where(id).update("is_active", false);
  }
}

class CommentDB extends SQLDataSource {
  async getComment(id) {
    return this.knex
      .select("*")
      .first()
      .from("comment")
      .where({ id })
      .cache(CACHE_TTL);
  }

  async getAttribute(attrName, id) {
    const result = await this.knex
      .select(attrName)
      .from("comment")
      .where({ id })
      .cache(CACHE_TTL);
    return result[0][attrName];
  }

  async getCommentIdsByAuthorId(id) {
    return this.knex
      .from("comment")
      .where({ authorId: id })
      .cache(CACHE_TTL);
  }

  async getCommentIdsByMediaId(id) {
    return this.knex
      .from("comment")
      .where({ mediaId: id })
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
    await this.knex("comment").where({ id }).del();
    return true;
  }
}

module.exports = {
  MediaDB,
  UserDB,
  CommentDB,
};
