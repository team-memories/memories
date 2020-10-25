exports.up = async function (knex) {
  console.warn("All media being processed will be deleted");
  await knex("media").where("isProcessing", true).del();
  const dropIsProcessingColumnFromMediaTable = knex.schema.table("media", function (table) {
    table.dropColumn("isProcessing");
  });
  const createMediaUnderProcessingTable = knex.schema.createTable(
    "media_under_processing",
    function (table) {
      table.integer("id").unsigned().primary();
      table
        .foreign("id")
        .references("id")
        .inTable("media")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    }
  );
  await dropIsProcessingColumnFromMediaTable;
  await createMediaUnderProcessingTable;
};

exports.down = async function (knex) {
  console.warn("All media being processed will be deleted");
  await knex("media").whereIn("id", knex.select("id").from("media_under_processing")).delete();
  const AddIsProcessingColumnToMediaTable = knex.schema.table("media", function (table) {
    table.boolean("isProcessing").notNullable().defaultTo(false);
  });
  const dropMediaUnderProcessingTable = knex.schema.dropTable("media_under_processing");
  await AddIsProcessingColumnToMediaTable;
  await dropMediaUnderProcessingTable;
};
