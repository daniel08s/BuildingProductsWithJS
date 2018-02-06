// npm packages
import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

// our packages
import Home from '../home';
import Other from '../other';
import NotFound from '../notfound';

export default () => (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/other" component={Other} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
);