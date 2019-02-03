import * as actionTypes from "../actions/actionTypes";

const initialState = {
  tasks: []
};

const completedTasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INIT_COMPLETED_TASKTS:
      return {
        ...state,
        tasks: action.tasks
      };
    
    case actionTypes.DELETE_COMPLETED_TASK:
    console.log(action)
    return {
      ...state,
      tasks: action.tasks
    }

    default:
      return state;
  }
};

export default completedTasksReducer;
