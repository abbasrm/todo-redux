import axios from "../components/UI/axios/axios-tasks";
import * as actionTypes from "./actionTypes";


const setCompletedTasks = tasks => {
  return {
    type: actionTypes.INIT_COMPLETED_TASKTS,
    tasks: tasks
  };
};

const setDeleteCompletedTask = tasks => {
  return {
    type: actionTypes.DELETE_COMPLETED_TASK,
    tasks
  };
};

export const deleteCompletedTask = (delId, tasks) => {
  return dispatch => {
    axios
      .delete("/tasks/" + delId + ".json")
      .then(res => {
        console.log("deleted");
        dispatch(setDeleteCompletedTask(tasks));
      })
      .catch(err => console.log(err));
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

