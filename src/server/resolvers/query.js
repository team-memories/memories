module.exports = {
  media: async (_, { id }) => ({
    id,
  }),
  search: async (_, args, { dataSources: { mediaDB } }) => {
    return mediaDB.searchMedia(args);
  },
  user: async (_, { id }) => ({ id }),
  myMedia: async () => {
    // TODO
  },
};
