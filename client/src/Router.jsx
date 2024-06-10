// src/Router.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import StartMenu from './StartMenu';
import PhaserGame from './PhaserGame';
import LeaderBoard from './LeaderBoard';

const AppRouter = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={StartMenu} />
      <Route path="/game" component={PhaserGame} />
      <Route path="/leaderboard" component={LeaderBoard} />
    </Switch>
  </Router>
);

export default AppRouter;
