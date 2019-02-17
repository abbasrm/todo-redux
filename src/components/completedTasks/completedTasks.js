import React, { Component } from "react";
import { connect } from "react-redux";
import Task from "./Task";
import todoStyle from "../../hoc/todoStyle";
import CSSModules from'react-css-modules';

import styles from "./completedTasks.module.css";

import * as actions from "../../actions/index";

class CompletedTasks extends Component {
  componentDidMount() {
    this.props.onInitComTasks();
  }

  render() {
    //   console.log(completedTasks);
    console.log(this.props.tasks);

    return this.props.tasks.length ? (
      <table styleName="myTable" className="mb-2">
        <thead>
          <tr className="thead-dark">
            <th>Title</th>
            <th>Detail</th>
            <th>Date</th>
            <th>Status</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {this.props.tasks.map(el => {
            return (
              <Task key={el.id} task={el} onChange={this.props.changeDone} />
            );
          })}
        </tbody>
      </table>
    ) : (
      <p>No tasks added yet.</p>
    );

    //   <p>
    //     {this.props.tasks.map(t => {
    //       return <p>{t.title}</p>;
    //     })}
    //   </p>
    //);
  }
}

const mapStateToProps = state => {
  return {
    tasks: state.comTs.tasks
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInitComTasks: () => dispatch(actions.initCompletedTasks())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CSSModules(CompletedTasks, styles));
