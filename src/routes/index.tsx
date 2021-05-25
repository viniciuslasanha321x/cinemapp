import React from 'react';
import { Route, Switch } from 'react-router';

import Dashboard from '../pages/dashboard';
import FavoriteMovies from '../pages/favorites';
import Results from '../pages/results';

const Routes: React.FC = () => (
  <>
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/results" component={Results} />
      <Route path="/favorite" component={FavoriteMovies} />
    </Switch>
  </>
);

export default Routes;
