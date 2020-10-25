module.exports = {
  media: async (_, { id }) => ({
    id,
  }),
  search: async (_, args, { dataSources: { mediaDB } }) => {
    return mediaDB.searchMedia(args);
  },
  user: async (_, { id }) => ({ id }),
  myMedia: async (_, __, { userId, dataSources: { mediaDB } }) => {
    if (!userId) {
      throw new Error("Login required");
    }
    return mediaDB.getMediaByAuthorId(userId);
  },
  tags: async (_, __, { dataSources: { mediaDB } }) => {
    return mediaDB.getTagList();
  }
};
