const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User{
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
}

  type Auth {
    token: ID!
    user: User
}

  type Book {
    bookId: ID
    authors: [String]
    description: String
    title: String
    image: String
    link: String
}

  input bookDetails {
    description: String
    title: String
    bookId: String
    image: String
    link: String
    authors: [String]
}

  type Query {
    # Because we have the context functionality in place to check a JWT and decode its data, we can use a query that will always find and return the logged in user's data
    me: User
}

  type Mutation {
   login(email: String!, password: String!): Auth
   addUser(username: String!, email: String!, password: String!): Auth
   saveBook(input: bookDetails!): User
   removeBook(bookId: ID!): User
}
`;

module.exports = typeDefs;
