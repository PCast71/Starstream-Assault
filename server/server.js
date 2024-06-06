const express = require('express');
// const mongoose = require('mongoose');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware'); // Importing http-proxy-middleware
const db = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const leaderboardRoutes = require('./routes/leaderboardRoutes');
const graphqlServer = require('./graphql');

const app = express();

// Middleware handling
app.use(cors());
app.use(express.json());

// Serve static files (sprites)
app.use(express.static('public'));

//Establishing routes
app.use('/api/auth', authRoutes);
app.use('/api/leaderboard', leaderboardRoutes);

// Set up proxy for backend API
app.use('/', createProxyMiddleware({ target: 'http://localhost:5001', changeOrigin: true }));

//GraphQL middleware
graphqlServer.applyMiddleware({ app });

// Database connection
db.once('open', () => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    });


// Server Startup
const PORT = process.env.PORT || 5000;

