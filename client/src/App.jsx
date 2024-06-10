import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import StartMenu from './components/Game/StartMenu';
import LeaderBoard from './components/Leaderboard/Leaderboard';
import PhaserGameComponent from './components/Game/PhaserGameComponent'; // Correctly import PhaserGameComponent

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql', 
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={<StartMenu />} />
          <Route path="/game" element={<PhaserGameComponent />} />
          <Route path="/leaderboard" element={<LeaderBoard />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;