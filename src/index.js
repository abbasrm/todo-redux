import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import Redirect from './redirect';
import * as serviceWorker from "./serviceWorker";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { BrowserRouter } from "react-router-dom";

import tasksReducer from "./reducers/tasks";
import accordionReducer from "./reducers/accordion";
import completedTasksReducer from "./reducers/completedTasks";

const rootReducer = combineReducers({
  ts: tasksReducer,
  acco: accordionReducer,
  comTs: completedTasksReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Redirect />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
