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
  Mutation: {
    async createRecipe(
      _,
      { recipeInput: { name, description, imageUrl, ingredients } }
    ) {
      const createdRecipe = new Recipe({
        name: name,
        description: description,
        createdAt: new Date().toISOString(),
        thumbsUp: 0,
        thumbsDown: 0,
        imageUrl: imageUrl,
        ingredients: ingredients,
      });

      const res = await createdRecipe.save(); //MongoDB saving
      console.log("res doc", res._doc);
      return {
        id: res.id,
        ...res._doc,
      };
    },

    async deleteRecipe(_, { ID }) {
      const wasDeleted = (await Recipe.deleteOne({ _id: ID })).deletedCount;
      //1 if something was deleted, 0 if nothing was deleted
      // true or false
      return wasDeleted;
    },

    async editRecipe(_, { ID, recipeInput: { name, description } }) {
      const wasEdited = (
        await Recipe.updateOne(
          { _id: ID },
          { name: name, description: description }
        )
      ).modifiedCount;
      return wasEdited; //1 if something was edited, 0 if nothing was edited (true or false)
    },
  },
};
