const usersResolvers = require("./users");
const recipesResolvers = require("./recipes");

module.exports = {
  Query: {
    ...recipesResolvers.Query,
  },
  Mutation: {
    ...recipesResolvers.Mutation,
    ...usersResolvers.Mutation,
  },
};
