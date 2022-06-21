const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

const MONGODB =
  "mongodb+srv://Test-Fabio:test-fabio@cluster0.0uyrn4v.mongodb.net/?retryWrites=true&w=majority";

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB Connection successful");
    return server.listen({ port: 4000 });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  });
