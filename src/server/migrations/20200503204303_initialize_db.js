exports.up = async function (knex) {
  await knex.schema.createTable("user", function (table) {
    table.increments("id").unsigned().primary();
    table.string("email").notNullable();
    table.string("password").notNullable();
    table.string("name").notNullable();
    table.text("profile_img_url");
  });

  await knex.schema.createTable("media", function (table) {
    table.increments("id").unsigned().primary();
    table.string("title").notNullable();
    table.enum("type", ["VIDEO", "PHOTO"]).notNullable();
    table.enum("category", ["CITY", "NATURE", "OBJECT"]).nullable();
    table.text("thumbnail_url").notNullable();
    table.text("original_url").notNullable();
    table.text("url").notNullable();
    table.integer("author_id").unsigned().notNullable();
    table
      .foreign("author_id")
      .references("id")
      .inTable("user")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.string("location").notNullable();
    table.integer("year").notNullable();
    table.text("description").nullable();
    table.boolean("is_processing").notNullable();
  });

  await knex.schema.createTable("comment", function (table) {
    table.increments("id").unsigned().primary();
    table.text("body");
    table.integer("media_id").unsigned().notNullable();
    table
      .foreign("media_id")
      .references("id")
      .inTable("media")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.integer("author_id").unsigned().notNullable();
    table
      .foreign("author_id")
      .references("id")
      .inTable("user")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("comment");
  await knex.schema.dropTableIfExists("media");
  await knex.schema.dropTableIfExists("user");
};
