const User = require("../models/user");

module.exports = {
  Mutation: {
    async createRecipe(
      _,
      { recipeInput: { name, description, imageUrl, ingredients } }
    ) {},
  },
};
