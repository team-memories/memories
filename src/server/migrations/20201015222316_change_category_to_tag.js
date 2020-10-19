exports.up = async function(knex) {
  await knex.schema.createTable("tag", function(table) {
    table.increments("id").unsigned().primary();
    table.string("tag_name").notNullable();
  });

  await knex("tag").insert({ tag_name: "CITY" });
  await knex("tag").insert({ tag_name: "NATURE" });
  await knex("tag").insert({ tag_name: "OBJECT" });

  await knex.schema.createTable("tag_media_connect", function(table) {
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

  let mediaJoinResult = await knex("media").join("tag", "tag.tag_name", "media.category").select("tag.id as tag", "media.id as media");
  mediaJoinResult.forEach(async function(row) {
    await knex("tag_media_connect").insert({ tagId: row["tag"], mediaId: row["media"] });
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
    .join("tag_media_connect", "media.id", "tag_media_connect.mediaId")
    .join("tag", "tag.id", "tag_media_connect.tagId")
    .select(
      "media.id as id",
      "media.title as title",
      "media.type as type",
      "media.thumbnailUrl as thumbnailUrl",
      "media.originalUrl as originalUrl",
      "media.url as url",
      "media.authorId as authorId",
      "media.location as location",
      "media.year as year",
      "media.description as description",
      "media.isProcessing as isProcessing",
      "tag.tag_name as tag_name"
    );
  
  mediaJoinTagName.forEach(async function(row) {
    await knex("media").where("media.id", row["id"]).del();
    await knex("media").insert({
      id: row["id"],
      title: row["title"],
      type: row["type"],
      thumbnailUrl: row["thumbnailUrl"],
      originalUrl: row["originalUrl"],
      url: row["url"],
      authorId: row["authorId"],
      location: row["location"],
      year: row["year"],
      description: row["description"],
      isProcessing: row["isProcessing"],
      category: row["tag_name"]
    });
  });

  await knex.schema.dropTableIfExists("tag_media_connect");
  await knex.schema.dropTableIfExists("tag");
};