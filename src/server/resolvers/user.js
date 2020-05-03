const defaultAttributeResolverMaker = require("../utils/default-attribute-resolver-maker");

module.exports = {
  ...defaultAttributeResolverMaker(
    ["email", "name", "profileImgUrl"],
    "commentDB"
  ),
  myMedia: async () => {
    // TODO
  },
};
