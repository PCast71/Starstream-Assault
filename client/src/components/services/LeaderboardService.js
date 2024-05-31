const mosckScores = [
    { username: 'Player1', points: 100 },
    { username: 'Player2', points: 95 },
    { username: 'Player3', points: 87 },
];

const getScores = async () => {
    // simulated API call to test leaderboard and styling
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mosckScores);
        }, 1000);
    });
};

const LeaderboardService = {
    getScores,
};

export default LeaderboardService;

// mock leaderboard for testing function and style when ready -PC