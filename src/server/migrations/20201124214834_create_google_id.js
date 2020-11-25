exports.up = async function (knex) {
  await knex.schema.table("user", function (table) {
    table.string("googleId").defaultTo(null);
    table.string("password").nullable().alter();
  });
};

exports.down = async function (knex) {
  await knex.schema.table("user", function (table) {
    table.dropColumn("googleId");
    table.string("password").notNullable().alter();
  });
};
