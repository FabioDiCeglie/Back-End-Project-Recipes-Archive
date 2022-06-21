const Recipe = require("../models/recipe");

module.exports = {
  Query: {
    async recipe(_, { ID }) {
      return await Recipe.findById(ID);
    },
    async getRecipes(_, { amount }) {
      return await Recipe.find().sort({ createdAt: -1 }).limit(amount);
    },
  },
  Mutation: {},
};
