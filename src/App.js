import React, { Component } from 'react';
import Navigation from './components/Navigation';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Admin from './frontend/Admin';
import Home from './frontend/Home';
import Dashboard from './frontend/Dashboard';
import Event from './frontend/EventInfo';
import Registration from './frontend/Registration';
import Settings from './frontend/Settings';
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navigation />
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/admin" component={Admin} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/event" component={Event} />
            <Route path="/settings" component={Settings} />
            <Route path="/registration" component={Registration} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;