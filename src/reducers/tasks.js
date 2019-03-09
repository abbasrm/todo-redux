import * as actionTypes from "../actions/actionTypes";

const initialState = {
  tasks: []
};

const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INIT_TASKS:
      return {
        ...state,
        tasks: action.tasks
      };

    case actionTypes.ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.task]
      };

    case actionTypes.DELETE_TASK:
      return {
        state,
        tasks: action.tasks
      };

    case actionTypes.ON_TASK_DONE:
      const tasks = state.tasks.filter(t => t.id2 !== action.id);
      return {
        ...state,
        tasks
      }

    default:
      return state;
  }
};

export default tasksReducer;
