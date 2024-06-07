import React from 'react';
import { useHistory } from 'react-router-dom';

const StartGame = () => {
    const history = useHistory();

    const StartGame = () => {
        history.push('/game');
    };

    return (
        <div>
            <h1>Start Game</h1>
            <button onClick={StartGame}>Start Game</button>
            <Leaderboard />
        </div>
    );
};

const Leaderboard = () => {
    return <div>Leaderboard</div>
};

export default StartGame;