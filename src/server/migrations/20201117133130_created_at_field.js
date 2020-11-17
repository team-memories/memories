exports.up = async function (knex) {
  await knex.schema.table("media", function (table) {
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now(6));
  });
  await knex.schema.table("comment", function (table) {
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now(6));
  });
  await knex.schema.table("user", function (table) {
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now(6));
  });
  await knex.schema.table("tag", function (table) {
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now(6));
  });
};

exports.down = async function (knex) {
  await knex.schema.table("media", function (table) {
    table.dropColumn("createdAt");
  });
  await knex.schema.table("comment", function (table) {
    table.dropColumn("createdAt");
  });
  await knex.schema.table("user", function (table) {
    table.dropColumn("createdAt");
  });
  await knex.schema.table("tag", function (table) {
    table.dropColumn("createdAt");
  });
};
