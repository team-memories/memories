exports.up = async function (knex) {
  await knex.schema.createTable("user", function (table) {
    table.increments("id").unsigned().primary();
    table.string("email").notNullable();
    table.string("password").notNullable();
    table.string("name").notNullable();
    table.text("profileImgUrl");
  });

  await knex.schema.createTable("media", function (table) {
    table.increments("id").unsigned().primary();
    table.string("title").notNullable();
    table.enum("type", ["VIDEO", "PHOTO"]).notNullable();
    table.enum("category", ["CITY", "NATURE", "OBJECT"]).nullable();
    table.text("thumbnailUrl").notNullable();
    table.text("originalUrl").notNullable();
    table.text("url").notNullable();
    table.integer("authorId").unsigned().notNullable();
    table
      .foreign("authorId")
      .references("id")
      .inTable("user")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.string("location").notNullable();
    table.integer("year").notNullable();
    table.text("description").nullable();
    table.boolean("isProcessing").notNullable();
  });

  await knex.schema.createTable("comment", function (table) {
    table.increments("id").unsigned().primary();
    table.text("body");
    table.integer("mediaId").unsigned().notNullable();
    table
      .foreign("mediaId")
      .references("id")
      .inTable("media")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.integer("authorId").unsigned().notNullable();
    table
      .foreign("authorId")
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
