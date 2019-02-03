import axios from "../components/axios-tasks";
import * as actionTypes from "./actionTypes";


const setCompletedTasks = tasks => {
  return {
    type: actionTypes.INIT_COMPLETED_TASKTS,
    tasks: tasks
  };
};


export const initCompletedTasks = () => {
  return dispatch => {
    const tasks = [];

    axios.get('/tasks.json?orderBy="done"&equalTo=true').then(res => {
      for (let id in res.data) {
        tasks.push({
          id2: id,
          ...res.data[id]
        });
      }

      dispatch(setCompletedTasks(tasks));
    });
  };
};

