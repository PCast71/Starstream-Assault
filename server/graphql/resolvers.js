const leaderboard = [
  { id: '1', username: 'Player1', score: 100 },
  { id: '2', username: 'Player2', score: 80 },
];

const resolvers = {
  Query: {
    leaderboard: () => leaderboard,
  },
  Mutation: {
    addScore: (parent, args) => {
      const newPlayer = { id: String(leaderboard.length + 1), username: args.username, score: args.score };
      leaderboard.push(newPlayer);
      return newPlayer;
    },
  },
};

module.exports = resolvers;