const User = require("../models/User");
const { ApolloError } = require("apollo-server-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  Mutation: {
    async registerUser(_, { registerInput: { username, email, password } }) {
      // see if an old user exist with email
      const oldUser = await User.findOne({ email });

      // throw error if user exists
      if (oldUser) {
        throw new ApolloError(
          "A user is already registered with the email" + email
        );
      }

      // encrypt password
      const encryptedPassword = await bcrypt.hash(password, 10);

      // Build out mongoose model (User)
      const newUser = new User({
        username: username,
        email: email.toLowerCase(),
        password: encryptedPassword,
      });

      // create our JWT (attach to ous user model)
      const token = jwt.sign({ user_id: newUser._id, email }, "UNSAFE_STRING", {
        expiresIn: "3h",
      });

      newUser.token = token;

      // Save our user in MongoDB
      const res = await newUser.save();

      return {
        id: res.id,
        ...res._doc,
      };
    },
  },
};
