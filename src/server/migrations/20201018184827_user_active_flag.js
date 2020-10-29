exports.up = async function (knex) {
  await knex.schema.table("user", function (table) {
    table.boolean("isActive").notNullable().defaultTo(true);
  });
};

exports.down = async function (knex) {
  await knex.schema.table("user", function (table) {
    table.dropColumn("isActive");
  });
};
