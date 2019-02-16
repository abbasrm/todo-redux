import React from "react";
import { Route, Switch, NavLink } from "react-router-dom";
import App from "./App";
import CompletedTasks from './components/completedTasks/completedTasks'

const redirect = props => {
  return (
    <>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/completed-tasks">completed tasks</NavLink>
      <Switch>
        <Route exact path="/completed-tasks" component={CompletedTasks} />
        <Route path="/" component={App} />
      </Switch>
    </>
  );
};

export default redirect;
