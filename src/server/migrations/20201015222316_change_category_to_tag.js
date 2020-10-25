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

  let mediaJoinResult = await knex("media").join("tag", "tag.tagName", "media.category").select("tag.id as tag", "media.id as media");
  mediaJoinResult.forEach(async function(row) {
    await knex("tagMediaConnect").insert({ tagId: row["tag"], mediaId: row["media"] });
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
      "tag.tagName as tagName"
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
      category: row["tagName"]
    });
  });

  await knex.schema.dropTableIfExists("tagMediaConnect");
  await knex.schema.dropTableIfExists("tag");
};