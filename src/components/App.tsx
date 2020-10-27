import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import ROUTES from '../constants/routes';

import Squad from './Squad';
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
              <Link to={ROUTES.SQUAD}>Squad</Link>
            </li>
            <li>
              <Link to={ROUTES.RAID_DAY}>Raid Day</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path={ROUTES.RAID_DAY}>
            <RaidDay />
          </Route>
          <Route path={ROUTES.SQUAD}>
            <Squad />
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