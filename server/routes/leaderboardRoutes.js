const express = require('express');
const leaderboardController = require('../controllers/leaderboardController');

const router = express.Router();

router.get('/', leaderboardController.getScores);
router.post('/', leaderboardController.addScore);

module.exports = router;