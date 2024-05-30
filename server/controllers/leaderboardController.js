const Score = require('../models/Score');

exports.getScores = async (req, res) => {
    try {
        const scores = await Score.find().sort({ points: -1 }).limit(8);
        res.json(scores);
     } catch (error) {
            res.status(500).json({ error: 'Server error'});
        }
};

exports.addScore = async (req, res) => {
    const { username, points } = req.body;
    try {
        const newScore = new Score({ username, points });
        await newScore.save();
        res.status(201).json({ message: 'Score added successfully' });
       } catch (error) {
        res.status(500).json({ error: 'Server error' });
       }
};

// will fetch the top 8 scores from db, sort them from highest to lowest and sends them off as a JSON, and then adds a new score to database with appropriate username and score. _PC