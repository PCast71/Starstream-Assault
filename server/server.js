const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config/config');
const authRoutes = require('./routes/authRoutes');
const leaderboardRoutes = require('./routes/leaderboardRoutes');

const app = express();

// Middleware handling

app.use(cors());
app.use(express.json());

//Database link
mongoose.connect(config.dbUri, { useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.log(err));

//Establish Routes
app.use('/api', authRoutes);
app.use('/api/leaderboard', leaderboardRoutes);

//Server Startup
const PORT = process.env.PROT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

//Setup server.js to start testing when able to -PC