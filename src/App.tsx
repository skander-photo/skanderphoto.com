import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Gallery } from './components/Gallery/Gallery';
import { initialStore, RootStoreContext } from './store';

export const App = () => {
  return (
    <RootStoreContext.Provider value={initialStore}>
      <Router>
        <Switch>
          <Route exact path="/" component={Gallery} />
        </Switch>
      </Router>
    </RootStoreContext.Provider>
  );
};
