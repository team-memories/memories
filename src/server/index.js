require("dotenv").config();
const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");
const { MediaDB, CommentDB, UserDB, TagDB } = require("./data-sources");
const query = require("./resolvers/query");
const mutation = require("./resolvers/mutation");
const { media, photo, video } = require("./resolvers/media");
const user = require("./resolvers/user");
const comment = require("./resolvers/comment");
const jwt = require("jsonwebtoken");

const resolvers = {
  Query: query,
  Mutation: mutation,
  Media: media,
  Photo: photo,
  Video: video,
  User: user,
  Comment: comment,
};
const knexConfig = {
  client: "pg",
  connection: {
    host: "db",
    database: process.env.DEV_DB,
    user: process.env.DEV_DB_USER,
    password: process.env.DEV_DB_PW,
  },
  log: {
    warn(message) {},
    error(message) {},
    deprecate(message) {},
    debug(message) {},
  },
};
const knex = require("knex")(knexConfig);

knex
  .select("name")
  .from("user")
  .where({ id: 1 })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  })
  .then((result) => {
    console.log(result[0].name);
    console.log("Database connected");
  });

// TODO(yun-kwak): DataLoader

// InMemoryLRU Cache 사용
const mediaDB = new MediaDB(knexConfig);
const userDB = new UserDB(knexConfig);
const commentDB = new CommentDB(knexConfig);
const tagDB = new TagDB(knexConfig);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const auth = req.get("Authorization");
    if (!auth) {
      return {};
    }
    const token = auth.replace("Bearer ", "");
    let userId;
    try {
      userId = jwt.verify(token, process.env.SECRET).userId;
    } catch {
      throw new Error("Invalid token");
    }

    return {
      userId,
    };
  },
  dataSources: () => ({ mediaDB, userDB, commentDB, tagDB }),
});

server.listen().then(({ url }) => {
  console.log(
    "그 때 그 시간을 다시 생생하게, Memories.\n" + `Server is ready at: ${url}`
  );
});
