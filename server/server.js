const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware'); // Importing http-proxy-middleware
const db = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const leaderboardRoutes = require('./routes/leaderboardRoutes');

const app = express();

// Middleware handling
app.use(cors());
app.use(express.json());

// Serve static files (sprites)
app.use(express.static('public'));

// Database connection
db.once('open', () => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    });


// Establish Routes
// app.use('/api', authRoutes);
// app.use('/apieaderboard', leaderboardRoutes);

// Set up proxy for backend API
app.use('/', createProxyMiddleware({ target: 'http://localhost:5001', changeOrigin: true }));

// Server Startup
const PORT = process.env.PORT || 5000;

