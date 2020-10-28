const defaultAttributeResolverMaker = require("../utils/default-attribute-resolver-maker");

module.exports = {
  ...defaultAttributeResolverMaker(
    ["email", "name", "profileImgUrl", "isActive"],
    "userDB"
  ),
  myMedia: async ({ id }, _, { dataSources: { mediaDB } }) => {
    return mediaDB.getMediaByAuthorId(id);
  },
};
