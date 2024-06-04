const express = require('express');
const leaderboardController = require('../controllers/leaderboardController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', leaderboardController.getScores);
router.post('/', authMiddleware, leaderboardController.addScore);

module.exports = router;