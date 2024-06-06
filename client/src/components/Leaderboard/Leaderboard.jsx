import React from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import { useLocation, useHistory } from 'react-router-dom';
import './Leaderboard.css';

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
  const history = useHistory();
  const { score } = location.state || { score: 0 };
  const { loading, error, data } = useQuery(GET_LEADERBOARD);
  const [addScore] = useMutation(ADD_SCORE);

  React.useEffect(() => {
    if (score) {
      addScore({ variables: { username: 'Player1', score } });
    }
  }, [score, addScore]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const restartGame = () => {
    history.push('/game');
  };

  return (
    <div>
      <h1>Leaderboard</h1>
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

// fetch and display high scores.