const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Player {
    id: ID!
    username: String!
    score: Int!
  }

  type Query {
    leaderboard: [Player]
  }

  type Mutation {
    addScore(username: String!, score: Int!): Player
  }
`;

module.exports = typeDefs;