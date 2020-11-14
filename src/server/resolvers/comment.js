const defaultAttributeResolverMaker = require("../utils/default-attribute-resolver-maker");

module.exports = {
  ...defaultAttributeResolverMaker(["content", "isActive"], "commentDB"),
  author: async ({ id, authorId }, _, { dataSources: { commentDB } }) => {
    if (authorId) {
      return { id: authorId };
    }
    return {
      id: await commentDB.getAttribute("authorId", id),
    };
  },
};
