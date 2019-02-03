import axios from "../components/axios-tasks";
import * as actionTypes from "./actionTypes";

const setAddTask = (id, task) => {
  return {
    type: actionTypes.ADD_TASK,
    task: { ...task, id2: id }
  };
};

const openAcco = (date, status) => {
  return {
    type: actionTypes.OPEN_ACCORDION,
    date,
    status
  }
}

const setTasks = tasks => {
  return {
    type: actionTypes.INIT_TASKS,
    tasks: tasks
  };
};


const setDeleteTask = tasks => {
  return {
    type: actionTypes.DELETE_TASK,
    tasks
  };
};

export const deleteTask = (delId, tasks) => {
  return dispatch => {
    axios
      .delete("/tasks/" + delId + ".json")
      .then(res => {
        console.log("deleted");
        dispatch(setDeleteTask(tasks));
      })
      .catch(err => console.log(err));
  };
};

export const addTask = newTask => {
  return dispatch => {
    const task = {
      ...newTask
    };

    axios.post("/tasks.json", task).then(res => {
      console.log(task)
      dispatch(openAcco(task.viewDate, true))
      dispatch(setAddTask(res.data.name, task));
    });

    // this.setState({ tasks, currentAccLi: { date: task.viewDate, open: true } });
  };
};

export const initTasks = () => {
  return dispatch => {
    const tasks = [];

    axios.get('/tasks.json?orderBy="done"&equalTo=false').then(res => {
      for (let id in res.data) {
        tasks.push({
          id2: id,
          ...res.data[id]
        });
      }

      dispatch(setTasks(tasks));
    });
  };
};
