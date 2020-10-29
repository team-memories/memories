const defaultAttributeResolverMaker = require("../utils/default-attribute-resolver-maker");

const { tagName: name } = defaultAttributeResolverMaker(["tagName"], "mediaDB")

module.exports = {
  name
};
