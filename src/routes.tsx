import React from 'react';
import {
	Route,
	Switch,
	BrowserRouter as Router,
} from 'react-router-dom';
import Dashboard from './pages/Dashboard';

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/dashboard" exact component={() => <Dashboard />} />
        <Route path="/*" exact component={() => <h1>Página não encontrada</h1>} />
      </Switch>
    </Router>
  )
}