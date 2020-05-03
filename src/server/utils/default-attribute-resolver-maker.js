module.exports = (attrNames, dataSourceName) => {
  const resolvers = {};
  for (const attrName of attrNames) {
    resolvers[attrName] = async ({ id }, _, { dataSources }) => {
      return dataSources[dataSourceName].getAttribute(attrName, id);
    };
  }
  return resolvers;
};
