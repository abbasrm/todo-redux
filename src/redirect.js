import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import App from "./App";
import CompletedTasks from './components/completedTasks'

const redirect = props => {
  return (
    <>
      <Link to="/">Home</Link>
      <Link to="/completed-tasks">completed tasks</Link>
      <Switch>
        <Route exact path="/completed-tasks" component={CompletedTasks} />
        <Route path="/" component={App} />
      </Switch>
    </>
  );
};

export default redirect;
