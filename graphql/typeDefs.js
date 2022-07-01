const { gql } = require("apollo-server");

module.exports = gql`
  type Recipe {
    id: ID
    name: String
    description: String
    createdAt: String
    thumbsUp: Int
    thumbsDown: Int
    imageUrl: String
    ingredients: String
  }

  input RecipeInput {
    name: String
    description: String
    imageUrl: String
    ingredients: String
  }

  type User {
    username: String
    email: String
    password: String
    token: String
  }

  input RegisterInput {
    username: String
    email: String
    password: String
  }

  input LoginInput {
    email: String
    password: String
  }

  type Query {
    recipe(ID: ID!): Recipe!
    getRecipes(amount: Int): [Recipe]
  }

  type Mutation {
    createRecipe(recipeInput: RecipeInput): Recipe!
    deleteRecipe(ID: ID!): Boolean
    editRecipe(ID: ID!, recipeInput: RecipeInput): Boolean
    registerUser(registerInput: RegisterInput): User
    loginUser(loginInput: LoginInput): User
  }
`;
