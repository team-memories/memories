module.exports = (attrNames, dataSourceName) => {
  const resolvers = {};
  for (const attrName of attrNames) {
    resolvers[attrName] = async (parent, _, { dataSources }) => {
      if (parent[attrName] !== undefined) {
        return parent[attrName];
      }
      return dataSources[dataSourceName].getAttribute(attrName, parent.id);
    };
  }
  return resolvers;
};
