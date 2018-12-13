import React from 'react';
import { Router, Route } from 'react-router';

import App from './App';
import User from './pages/user/User';
import NotFound from './pages/NotFound/NotFound';

const Routes = ( props ) => (
    <Router {...props}>
      <Route path="/" component={App}>
        <Route path="/user" component={User} />
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  );
export default Routes;