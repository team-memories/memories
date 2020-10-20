exports.up = async function (knex) {
  await knex.schema.table("user", function (table) {
    table.boolean("is_active").notNullable().defaultTo(true);
  });
};

exports.down = async function (knex) {
  await knex.schema.table("user", function (table) {
    table.dropColumn("is_active");
  });
};
