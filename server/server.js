const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');
const leaderboardRoutes = require('./routes/leaderboardRoutes');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const app = express();
const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // Connect to the database
    await connectDB();
    console.log('Connected to the database');

    // Middleware handling
    app.use(cors());
    app.use(express.json());

    // Serve static files (sprites)
    app.use('/sprites', express.static('public/sprites'));

    // Set up proxy for backend API
    app.use('/api', createProxyMiddleware({
      target: 'http://localhost:5001',
      changeOrigin: true,
      onError: function(err, req, res) {
        console.error('Proxy Error:', err);
        res.status(500).send('Proxy Error');
      }
    }));

    // Establishing routes
    app.use('/api/leaderboard', leaderboardRoutes);

    // Apollo server setup
    const server = new ApolloServer({ typeDefs, resolvers });
    await server.start();
    server.applyMiddleware({ app });
    // if (process.env.NODE_ENV === 'production') {
      app.use(express.static(path.join(__dirname, '../client/dist')));
  
      app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/dist/index.html'));
      });
    // }
    // Start the server only after the database connection is established
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
  } catch (err) {
    console.error('Failed to start the server:', err);
    process.exit(1); // Exit the process with failure
  }
}

// Start the Apollo Server
startServer();
