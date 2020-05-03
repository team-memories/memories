module.exports = {
  media: async (_, { id }) => ({
    id,
  }),
  search: async (_, { queryStr, location, yearFrom, yearTo }) => {},
};
