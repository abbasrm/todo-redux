import React from "react";
import DeleteButtonCompleted from "../UI/DeleteButtonCompleted";

const Task = props => {
  let inputProps = {},
    doneClasses = ["form-check-labe"],
    doneText = "";

  if (props.task.done) {
    inputProps.defaultChecked = true;
    doneClasses.push("text-success");
    doneText = "Done";
  } else {
    inputProps = {};
    doneClasses.push("text-danger");
    doneText = "In progress!";
  }

  return (
    <tr key={props.task.id}>
      <td>{props.task.title}</td>
      <td>{props.task.detail}</td>
      <td>{props.task.viewDate}</td>
      <td>
        <div className="form-check form-check-inline ml-3">
          <input
            className="form-check-input"
            id={props.task.id2}
            type="checkbox"
            onChange={() => props.onChange(props.task.id2)}
            {...inputProps}
          />
          <label htmlFor={props.task.id2} className={doneClasses.join(" ")}>
            {doneText}
          </label>
        </div>
      </td>

      <td>
        <DeleteButtonCompleted id={props.task.id2} />
      </td>
    </tr>
  );
};

export default Task;
