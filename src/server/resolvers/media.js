const mediaResolvers = {
  __resolveType: async ({ id }, { dataSources: { mediaDB } }) => {
    const type = await mediaDB.getAttributeOfMedia("type", id);
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
  title: async ({ id }, args, { dataSources: { mediaDB } }) => {},
};

module.exports = {
  mediaResolvers,
};
