const mongoose = require('mongoose');

const ScoreSchema = new mongoose.Schema({
    username: { type: String, required: true },
    points: { type: Number, required: true },
});

module.exports = mongoose.model('Score', ScoreSchema);