const mongoose = require('mongoose');

const ScoreSchema = new mongoose.Schema({
    username: { type: String, required: true },
    points: { type: Number, required: true },
    level: { type: Number, default: 1 }, 
    date: { type: Date, default: Date.now } 
});

module.exports = mongoose.model('Score', ScoreSchema);
