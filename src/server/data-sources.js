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
      .where(function () {
        // eslint-disable-next-line no-invalid-this
        this.where("title", "like", `%${queryStr}%`)
          .orWhere("description", "like", `%${queryStr}%`)
          .orWhere("category", "like", `%${queryStr}%`);
      })
      .andWhere("location", "like", `${location}%`)
      .andWhereBetween("year", [yearFrom, yearTo])
      .cache(CACHE_TTL);
  }

  async createMedia(args) {
    let media;
    try {
      await this.knex.transaction(async (trx) => {
        media = await this.knex
          .insert({ ...args, originalUrl: "", thumbnailUrl: "", url: "" })
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

  async completeProcessing(id, url, thumbnailUrl, originalUrl, title) {
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
          .update({ url, thumbnailUrl, originalUrl, title })
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
      .where({ id: id, isActive: true })
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
    return this.knex.select("*").first().from("user").where({ email: email, isActive: true });
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
    await this.knex("user").where({ id }).update({ isActive : false });
    return true;
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

module.exports = {
  MediaDB,
  UserDB,
  CommentDB,
};
