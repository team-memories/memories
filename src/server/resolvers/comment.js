const defaultAttributeResolverMaker = require("../utils/default-attribute-resolver-maker");

module.exports = {
  ...defaultAttributeResolverMaker(["body"], "commentDB"),
  author: async () => {
    // TODO
  },
};
