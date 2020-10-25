exports.up = async function(knex) {
  await knex.schema.createTable("tag", function(table) {
    table.increments("id").unsigned().primary();
    table.string("tagName").notNullable();
  });

  await knex("tag").insert({ tagName: "CITY" });
  await knex("tag").insert({ tagName: "NATURE" });
  await knex("tag").insert({ tagName: "OBJECT" });

  await knex.schema.createTable("tagMediaConnect", function(table) {
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

  let mediaJoinResult = await knex("media").join("tag", "tag.tagName", "media.category").select("tag.id as tagId", "media.id as mediaId");
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
      "tag.tagName as tagName"
    );
  
  mediaJoinTagName.forEach(async function(row) {
    await knex("media").where("id", row["id"]).update({ category: row["tagName"]});
  });

  await knex.schema.dropTableIfExists("tagMediaConnect");
  await knex.schema.dropTableIfExists("tag");
};