import React from "react";
import { Route, Switch } from "react-router-dom";
import App from './App';

const redirect = props => {
  return (
  <Switch>
        <Route path="/completed-tasks" component={App} />
      <Route path="/" component={App} />
  </Switch>
  );
};

export default redirect;
