const { SQLDataSource } = require("datasource-sql");

const CACHE_TTL = 17;

class MediaDB extends SQLDataSource {
  getMedia(id) {}
}
class UserDB extends SQLDataSource {
  getUser(id) {
    return this.knex
      .select("*")
      .from("user")
      .where({ id: id })
      .cache(CACHE_TTL)[0];
  }
}

class CommentDB extends SQLDataSource {}

module.exports = {
  MediaDB,
  UserDB,
  CommentDB,
};
