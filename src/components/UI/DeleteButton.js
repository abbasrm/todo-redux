import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import { connect } from "react-redux";

import * as actionTasksCreators from "../../actions/tasks";

const DeleteButton = props => {
  const deleteHandler = (delId) => {
    const task = { ...props.tasks.filter(elem => elem.id2 === delId) },
      otherTasks = [...props.tasks.filter(elem => elem.id2 !== delId)];

    const taskTitle = task[0].title;
    
    if (window.confirm(`Are you sure to delete ${taskTitle}?`)) {
      props.onDelete(props.id, otherTasks);
    }
  };

  return (
    <button
      type="button"
      className="btn btn-danger px-1 py-0"
      onClick={() => deleteHandler(props.id, props.tasks)}
    >
      <FontAwesomeIcon icon={faTrashAlt} />
    </button>
  );
};

const mapStateToProps = state => {
  return {
    tasks: state.ts.tasks
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onDelete: (id, tasks) => dispatch(actionTasksCreators.deleteTask(id, tasks))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteButton);
