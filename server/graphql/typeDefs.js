const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Player {
    id: ID!
    name: String!
    score: Int!
  }

  type GameState {
    id: ID!
    status: String!
    players: [Player]!
  }

  type Query {
    players: [Player]
    gameState: GameState
  }

  type Mutation {
    addPlayer(name: String!): Player
    updateScore(id: ID!, score: Int!): Player
    startGame: GameState
    endGame: GameState
  }
`;

module.exports = typeDefs;
