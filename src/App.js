import React from 'react';
import logo from './logo.svg';

import Dic from './Dic';
import Config from './Config';

import { HashRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Route exact path="/">
            <Dic />
          </Route>
          <Route path="/dic">
            <Dic />
          </Route>
          <Route path="/config">
            <Config />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
