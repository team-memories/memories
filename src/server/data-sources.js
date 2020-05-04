const { SQLDataSource } = require("datasource-sql");

const CACHE_TTL = 17;

class MediaDB extends SQLDataSource {
  async getAttribute(attrName, id) {
    const result = await this.knex
      .select(attrName)
      .from("media")
      .where({ id })
      .cache(CACHE_TTL);
    return result[0][attrName];
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
}
class UserDB extends SQLDataSource {
  async getAttribute(attrName, id) {
    const result = await this.knex
      .select(attrName)
      .from("user")
      .where({ id })
      .cache(CACHE_TTL);
    return result[0][attrName];
  }
  async createUser({ email, password, name }) {
    const result = await this.knex
      .insert({ email, password, name })
      .into("user")
      .returning("*");
    return result[0];
  }
  async getUserByEmail(email) {
    const result = await this.knex.select("*").from("user").where({ email });
    return result[0];
  }
}

class CommentDB extends SQLDataSource {
  async getAttribute(attrName, id) {
    return this.knex
      .select(attrName)
      .from("comment")
      .where({ id })
      .cache(CACHE_TTL).rows[0];
  }
}

module.exports = {
  MediaDB,
  UserDB,
  CommentDB,
};
