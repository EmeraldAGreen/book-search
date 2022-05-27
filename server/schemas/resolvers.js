// import user model
const { User } = require('../models');
// import sign token function from auth
const { signToken } = require('../utils/auth');
// import error method from apollo server
const { AuthenticationError } = require('apollo-server-express');

const resolvers = { 
// get a single user by either their id or their username
    Query: {
        user: async (parent, { username, email }) => {
        return User.findOne({ $or: [{ username}, { email }] });
          }
    },
    Mutation: {
  // create a user, sign a token, and send it back (to client/src/components/SignUpForm.js)
        createUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, profile };
        }
    },
  // login a user, sign a token, and send it back (to client/src/components/LoginForm.js)
  // {body} is destructured req.body
        login: async (parent, { username, email, password }) => {
            const user = await User.findOne({ $or: [{ username }, { email }] });
            if (!user) { 
              throw new AuthenticationError('No user found!');
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw new AuthenticationError('Incorrect password!');
            }
      
            const token = signToken(user);
            return { token, user };
          },
  // save a book to a user's `savedBooks` field by adding it to the set (to prevent duplicates)
  // user comes from `req.user` created in the auth middleware function
        saveBook: async (parent, { bookId, savedBooks }, context) => {
            console.log(user);
     // If context has a `user` property, that means the user executing this mutation has a valid JWT and is logged in
            if (context.user) {
                return User.findOneAndUpdate(
                    { _id: bookId}, 
                    { 
                        $addtoSet: {savedBooks: book} },
                    { 
                        new: true, 
                        runValidators: true,
                    }
                );
            }
            // If user attempts to execute this mutation and isn't logged in, throw an error
            throw new AuthenticationError('You need to be logged in!');
    },
        deleteBook: async (parent, { user,savedBooks }, context) => {
            if (context.user) {
              return User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { saveBooks: book } },
                { new: true }
              );
            }
            throw new AuthenticationError('You need to be logged in!');
          },
};
module.exports = resolvers;



