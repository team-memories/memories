const defaultAttributeResolverMaker = require("../utils/default-attribute-resolver-maker");

const mediaTypeResolvers = {
  __resolveType: async ({ id }, { dataSources: { mediaDB } }) => {
    const type = await mediaDB.getAttribute("type", id);
    switch (type) {
      case "PHOTO":
        return "Photo";
      case "VIDEO":
        return "Video";
      default:
        throw new Error(
          "Data cannot be resolved to any Media implementation." +
            "Please contact to backend developers."
        );
    }
  },
};

const commentResolver = async ({ id }, _, { dataSources: { commentDB } }) => {
  return await commentDB.getCommentIdsByMediaId(id);
};

const videoTypeResolvers = {
  ...defaultAttributeResolverMaker(
    [
      "title",
      "category",
      "thumbnailUrl",
      "originalUrl",
      "url",
      "author",
      "location",
      "year",
      "description",
      "isProcessing",
    ],
    "mediaDB"
  ),
  comments: commentResolver,
};
const photoTypeResolvers = {
  ...defaultAttributeResolverMaker(
    [
      "title",
      "category",
      "thumbnailUrl",
      "originalUrl",
      "url",
      "author",
      "location",
      "year",
      "description",
      "isProcessing",
    ],
    "mediaDB"
  ),
  comments: commentResolver,
};

module.exports = {
  media: mediaTypeResolvers,
  video: videoTypeResolvers,
  photo: photoTypeResolvers,
};
