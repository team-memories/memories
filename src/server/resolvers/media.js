const defaultAttributeResolverMaker = require("../utils/default-attribute-resolver-maker");
const { mediaTypes } = require("./enums");

const mediaTypeResolvers = {
  __resolveType: async ({ id, type }, { dataSources: { mediaDB } }) => {
    let mediaType;
    if (type) {
      mediaType = type;
    } else {
      mediaType = await mediaDB.getAttribute("type", id);
    }
    switch (mediaType) {
      case mediaTypes.photo:
        return "Photo";
      case mediaTypes.video:
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
  return commentDB.getCommentIdsByMediaId(id);
};

const authorResolver = async ({ id, authorId }, _, { dataSources: { mediaDB } }) => {
  if (authorId) {
    return { id: authorId };
  }
  return { id: await mediaDB.getAttribute("authorId", id) };
};

const tagResolver = async ({ id }, _, { dataSources: { mediaDB }}) => {
  return await mediaDB.getTagIdsByMediaId(id);
}

const underProcessingResolver = async ({ id }, _, { dataSources: { mediaDB } }) => {
  return mediaDB.isUnderProcessing(id);
};

const videoTypeResolvers = {
  ...defaultAttributeResolverMaker(
    [
      "title",
      "thumbnailUrl",
      "originalUrl",
      "url",
      "location",
      "year",
      "description",
    ],
    "mediaDB"
  ),
  comments: commentResolver,
  author: authorResolver,
  tags: tagResolver,
  underProcessing: underProcessingResolver,
};
const photoTypeResolvers = {
  ...defaultAttributeResolverMaker(
    [
      "title",
      "thumbnailUrl",
      "originalUrl",
      "url",
      "location",
      "year",
      "description",
    ],
    "mediaDB"
  ),
  comments: commentResolver,
  author: authorResolver,
  tags: tagResolver,
  underProcessing: underProcessingResolver,
};

module.exports = {
  media: mediaTypeResolvers,
  video: videoTypeResolvers,
  photo: photoTypeResolvers,
};

