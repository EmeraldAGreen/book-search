import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
# LOGIN_USER will execute the loginUser mutation set up using Apollo Server.
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
    token
      user {
        _id
        username
      }
    }
    }
`;

export const ADD_USER = gql`
# ADD_USER will execute the addUser mutation.
mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
# SAVE_BOOK will execute the saveBook mutation.
    mutation saveBook(
    $description: String!, 
    $title: String!, 
    $bookId: String!, 
    $image: String!, 
    $link: String!, 
    $authors: [String!]) {
    saveBook( 
    description: $description
    title: $title
    bookId: $bookId
    image: $image
    link: $link
    authors: [$authors]]) {
      _id
      description
      title
      bookId
      image
      link
      authors
    }
  }
`;

export const REMOVE_BOOK = gql`
  # REMOVE_BOOK will execute the removeBook mutation
  mutation removeBook(
    $description: String!, 
    $title: String!, 
    $bookId: String!, 
    $image: String!, 
    $link: String!, 
    $authors: [String!]) {
    removeBook( 
    description: $description
    title: $title
    bookId: $bookId
    image: $image
    link: $link
    authors: [$authors]]) {
      _id
      description
      title
      bookId
      image
      link
      authors
    }
  }
`;