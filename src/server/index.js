require("dotenv").config();
const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");
const { MediaDB, CommentDB, UserDB } = require("./data-sources");

const resolvers = {};
const knexConfig = {
  client: "pg",
  connection:
    process.env.NODE_ENV === "development"
      ? {
          host: "127.0.0.1",
          user: process.env.DEV_DB_USER,
          password: process.env.DEV_DB_PW,
          database: process.env.DEV_DB,
        }
      : {},
};

// TODO(yun-kwak): DataLoader

// InMemoryLRU Cache 사용
const mediaDB = new MediaDB(knexConfig);
const userDB = new UserDB(knexConfig);
const commentDB = new CommentDB(knexConfig);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({ mediaDB, userDB, commentDB }),
});

server.listen().then(({ url }) => {
  console.log(
    "그 때 그 시간을 다시 생생하게, Memories.\n" + `Server is ready at: ${url}`
  );
});
