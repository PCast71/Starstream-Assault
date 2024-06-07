const { ApolloServer, gql } = require('apollo-server-express');
const { Score } = require('./models/Score'); // Adjust the path accordingly

// Defining Schema
const typeDefs = gql`
    type Score {
        id: ID!
        username: String!
        score: Int!
    }

    type Query {
        leaderboard: [Score]
    }

    type Mutation {
        addScore(username: String!, score: Int!): Score
    }
`;

// Defining resolvers
const resolvers = {
    Query: {
        leaderboard: async () => {
            return await Score.find().sort({ score: -1 }).limit(10);
        },
    },
    Mutation: {
        addScore: async (_, { username, score }) => {
            const newScore = new Score({ username, score });
            return await newScore.save();
        },
    },
};

// Apollo server
const server = new ApolloServer({ typeDefs, resolvers });
module.exports = server;
