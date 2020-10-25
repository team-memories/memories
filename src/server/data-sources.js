const { SQLDataSource } = require("datasource-sql");

const CACHE_TTL = 3;

class MediaDB extends SQLDataSource {
  async getMedia(id) {
    return await this.knex
      .select("*")
      .first()
      .from("media")
      .where({ id })
      .cache(CACHE_TTL);
  }

  async getAttribute(attrName, id) {
    const result = await this.knex
      .select(attrName)
      .first()
      .from("media")
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
        "tag.tagName as tagName",
        "tag.id as tagId"
      )
      .where(function () {
        // eslint-disable-next-line no-invalid-this
        this.where("title", "like", `%${queryStr}%`)
          .orWhere("description", "like", `%${queryStr}%`)
          .orWhere("tag.tagName", "like", `%${queryStr}%`);
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
    return await this.knex
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
    return await this.knex
      .from("comment")
      .where({ authorId: id })
      .cache(CACHE_TTL);
  }

  async getCommentIdsByMediaId(id) {
    return await this.knex
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

class TagDB extends SQLDataSource {
  async getTagList() {
    return this.knex("tag").select("*");
  }
}

class TagMediaConnectDB extends SQLDataSource {
  async getTagNameByMediaId(id) {
    return await this.knex
      .from("tagMediaConnect")
      .join("tag", "tag.id", "tagMediaConnect.tagId")
      .select("tag.id as id", "tag.tagName as tagName", "tagMediaConnect.mediaId as mediaId")
      .where({ mediaId: id })
      .orderBy("id", "desc")
      .cache(CACHE_TTL);
  }

  async addTagMediaConnect(tagName, mediaId) {
    let tagId = await this.knex("tag").select("id").where({ tagName: tagName });
    if(tagId.length == 0) { //등록된 tag가 아니라면 tag먼저 추가하기
      await this.knex("tag").insert({ tagName: tagName });
      tagId = await this.knex("tag").select("id").where({ tagName: tagName }); //리스트안에 사전 형태로 들어옴. -> [ {id: 0} ]
    }
    await this.knex("tagMediaConnect").insert({ tagId: tagId[0]["id"], mediaId: mediaId });
    return true;
  }

  async deleteTagMediaConnect(mediaId) {
    await this.knex("tagMediaConnect").where({ mediaId: mediaId }).del();
    return true;
  }
}

module.exports = {
  MediaDB,
  UserDB,
  CommentDB,
  TagDB,
  TagMediaConnectDB,
};
