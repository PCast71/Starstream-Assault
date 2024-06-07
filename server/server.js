const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');
const authRoute = require('./routes/authRoutes');
const leaderboardRoutes = require('./routes/leaderboardRoutes');
const { ApolloServer } = require('apollo-server-express');
// const { typeDefs, resolvers } = require('./graphql');
const authMiddleware = require('./middleware/authMiddleware');
const db = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware handling
app.use(cors());
app.use(express.json());

// Serve static files (sprites)
app.use(express.static('public'));

// Set up proxy for backend API
app.use('/api', createProxyMiddleware({ target: 'http://localhost:5001', changeOrigin: true }));

// Establishing routes
app.use('/api/auth', authRoute);
app.use('/api/leaderboard', leaderboardRoutes);

// Apollo Server setup
// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   context: authMiddleware
// });

// Apply GraphQL middleware after Apollo Server is set up
// server.applyMiddleware({ app, path: '/graphql' });

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
});
