import React, { useState, useEffect } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import { useLocation, useNavigate } from 'react-router-dom';

const GET_LEADERBOARD = gql`
  query GetLeaderboard {
    leaderboard {
      id
      username
      score
    }
  }
`;

const ADD_SCORE = gql`
  mutation AddScore($username: String!, $score: Int!) {
    addScore(username: $username, score: $score) {
      id
      username
      score
    }
  }
`;

const Leaderboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score } = location.state || { score: 0 };
  const { loading, error, data } = useQuery(GET_LEADERBOARD);
  const [addScore] = useMutation(ADD_SCORE);
  const [username, setUsername] = useState('Player1'); // Initialize with default username

  useEffect(() => {
    if (score) {
      addScore({ variables: { username, score } });
    }
  }, [score, username, addScore]);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const restartGame = () => {
    navigate('/game');
  };

  return (
    <div>
      <h1>Leaderboard</h1>
      <label>
        Username:
        <input type="text" value={username} onChange={handleUsernameChange} />
      </label>
      <ul>
        {data.leaderboard.map(({ id, username, score }) => (
          <li key={id}>
            {username}: {score}
          </li>
        ))}
      </ul>
      <button onClick={restartGame}>Restart Game</button>
    </div>
  );
};

export default Leaderboard;
