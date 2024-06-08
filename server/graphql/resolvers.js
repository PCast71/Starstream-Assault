const players = [];
let gameState = {
  id: '1',
  status: 'NOT_STARTED',
  players: []
};

const resolvers = {
  Query: {
    players: () => players,
    gameState: () => gameState
  },
  Mutation: {
    addPlayer: (_, { name }) => {
      const player = { id: `${players.length + 1}`, name, score: 0 };
      players.push(player);
      gameState.players.push(player);
      return player;
    },
    updateScore: (_, { id, score }) => {
      const player = players.find(p => p.id === id);
      if (player) {
        player.score = score;
        return player;
      }
      throw new Error('Player not found');
    },
    startGame: () => {
      gameState.status = 'IN_PROGRESS';
      return gameState;
    },
    endGame: () => {
      gameState.status = 'ENDED';
      return gameState;
    }
  }
};

module.exports = resolvers;
