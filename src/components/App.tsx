import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import ROUTES from '../constants/routes';

import Roster from './Roster';
import RaidDay from './RaidDay';
import Home from './Home'

function App() {
  return (
    <Router>
      <div>
        <nav style= {{position: "fixed"}}>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to={ROUTES.ROSTER}>Roster</Link>
            </li>
            <li>
              <Link to={ROUTES.RAID_DAY}>Raid Day</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path={ROUTES.RAID_DAY}>
            <RaidDay />
          </Route>
          <Route path={ROUTES.ROSTER}>
            <Roster />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;