const { SQLDataSource } = require("datasource-sql");

const CACHE_TTL = 17;

class MediaDB extends SQLDataSource {
  async getAttribute(attrName, id) {
    const result = await this.knex.select(attrName).from("media").where({ id });
    return result[0][attrName];
  }
}
class UserDB extends SQLDataSource {
  async getAttribute(attrName, id) {
    return this.knex
      .select(attrName)
      .from("user")
      .where({ id })
      .cache(CACHE_TTL)[0];
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
