exports.up = async function(knex) {
  await knex.schema.createTable("tag", function(table) {
    table.increments("id").unsigned().primary();
    table.string("name").notNullable();
  });

  await knex("tag").insert({ name: "CITY" });
  await knex("tag").insert({ name: "NATURE" });
  await knex("tag").insert({ name: "OBJECT" });

  await knex.schema.createTable("tagMediaConnect", function(table) {
    table.primary(["tagId", "mediaId"]);
    table.integer("tagId").unsigned().notNullable();
    table
      .foreign("tagId")
      .references("id")
      .inTable("tag")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.integer("mediaId").unsigned().notNullable();
    table
      .foreign("mediaId")
      .references("id")
      .inTable("media")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });

  let mediaJoinResult = await knex("media").join("tag", "tag.name", "media.category").select("tag.id as tagId", "media.id as mediaId");
  mediaJoinResult.forEach(async function(row) {
    await knex("tagMediaConnect").insert({ tagId: row["tagId"], mediaId: row["mediaId"] });
  });

  await knex.schema.table("media", function(table) {
    table.dropColumn("category");
  });

};

exports.down = async function(knex) {
  await knex.schema.table("media", function(table) {
    table.enum("category", ["CITY", "NATURE", "OBJECT"]).nullable();
  });

  let mediaJoinTagName = await knex("media")
    .join("tagMediaConnect", "media.id", "tagMediaConnect.mediaId")
    .join("tag", "tag.id", "tagMediaConnect.tagId")
    .select(
      "media.id as id",
      "tag.name as name"
    );
  
  mediaJoinTagName.forEach(async function(row) {
    await knex("media").where("id", row["id"]).update({ category: row["name"]});
  });

  await knex.schema.dropTableIfExists("tagMediaConnect");
  await knex.schema.dropTableIfExists("tag");
};