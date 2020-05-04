const defaultAttributeResolverMaker = require("../utils/default-attribute-resolver-maker");

module.exports = {
  ...defaultAttributeResolverMaker(["body"], "commentDB"),
  author: async ({ id }, _, { dataSources: { commentDB } }) => {
    const authorId = await commentDB.getAttribute("authorId", id);
    return {
      id: authorId,
    };
  },
};
