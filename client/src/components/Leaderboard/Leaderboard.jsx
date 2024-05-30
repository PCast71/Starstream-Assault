import React, { useEffect, useState } from 'react';
import LeaderboardService from '../services/LeaderboardService';
import '../Leaderboard/Leaderboard.css';

const Leaderboard = () => {
    const [scores, setScores] = useState([]);

    useEffect(() => {
        LeaderboardService.getScores().then(data => setScores(data));
    }, []);

    return (
        <div className='leaderboard'>
            <h2>Galactic Heroes</h2>
            <ul>
                {scores.map((score, index) => (
                    <li key={index}>{score.username}: {score.points}</li>
                ))}
            </ul>
        </div>
    );
};

export default Leaderboard;

// this will fetch a list of scores, stores them in state, and renders them in a list under "Galactic Heroes" -PC