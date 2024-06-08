const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const connectDB = require('./config/db'); // Ensure you have the correct path
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');
const leaderboardRoutes = require('./routes/leaderboardRoutes');
const authMiddleware = require('./middleware/authMiddleware');

// Import typeDefs and resolvers
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

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
app.use('/api/auth', authRoutes);
app.use('/api/leaderboard', leaderboardRoutes);

async function startServer() {
  // Connect to the database
  await connectDB();

  // Apollo server setup
  const server = new ApolloServer({ typeDefs, resolvers, context: authMiddleware });
  await server.start();
  server.applyMiddleware({ app });

  // Start the server only after the database connection is established
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

// Start the Apollo Server
startServer().catch(err => {
  console.error('Failed to start the server:', err);
});
