const { ApolloServer, gql } = require('apollo-server-espress');
const mongoose = require('mongoose');

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

//Defining resolvers
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

// MongoDB connection
const Score = mongoose.model('Score', new mongoose.Schema({
    username: String,
    score: Number,
}));

//Apollo server
const server = new ApolloServer({ typeDefs, resolver });
module.exports = server;

// Created graphql.js to handle leaderboard scores