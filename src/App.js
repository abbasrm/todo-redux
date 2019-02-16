import React, { PureComponent } from "react";
import axios from "./components/axios/axios-tasks";
import { connect } from "react-redux";

import todoStyle from "./hoc/todoStyle";
import "./App.css";
import Table from "./components/Tasks/Tasks";
import Form from "./components/Form/Form";
import { Aux } from "./hoc/hoc";
import * as actions from "./actions/index";
import "react-datepicker/dist/react-datepicker.css";

// Comments are usually another way of doing the same thing after or before that comment (and mostly in ES5 or less recommended way).

class App extends PureComponent {
  state = {
    date: new Date(),
    isValid: {
      title: "",
      detail: ""
    }
  };

  componentDidMount() {
    const today = this.getToday();

    this.props.onTasksInit();
    console.log('today', today);
    this.props.onOpenAcco(today);
  }

  componentWillUnmount(){
    this.props.onOpenAcco(null);
  }

  getToday = () => {
    const getToday = new Date(),
      getTheDay = getToday.getDate(),
      getTheMonth = getToday.getMonth() + 1,
      getTheYear = getToday.getFullYear();

    return `${getTheDay}/${getTheMonth}/${getTheYear}`;
  };

  getMaxId = () => {
    let tasks = [...this.props.tasks],
      tasksIds = tasks.map(task => {
        return task.id;
      });

    let maxId = tasks.length ? Math.max(...tasksIds) : 0;
    return maxId;
  };

  getInput = e => {
    let title = e.target.elements.title.value,
      detail = e.target.elements.detail.value,
      done = false,
      maxId = this.getMaxId(),
      getTheDate = this.state.date,
      getTheDay = getTheDate.getDate(),
      getTheMonth = getTheDate.getMonth() + 1,
      getTheYear = getTheDate.getFullYear(),
      viewDate = `${getTheDay}/${getTheMonth}/${getTheYear}`;

    const newTask = {
      //id: new Date().valueOf()
      id: maxId + 1,
      title,
      detail,
      done,
      date: this.state.date.toString(),
      viewDate
    };

    const reTitle = /^[a-zA-z ]{2,20}$/;
    const reDetail = /^[a-zA-z, ]{5,350}$/;

    if (!reTitle.test(title) || !reDetail.test(detail)) {
      this.validationCheck("title", title, reTitle);
      this.validationCheck("detail", detail, reDetail);
    } else {
      this.setState({
        isValid: {
          title: true,
          detail: true
        }
      });

      // const isTitle = this.state.tasks.find(e => e.title === newTask.title),
      //   isDetail = this.state.tasks.find(e => e.detail === newTask.detail),
      //   isDone = this.state.tasks.find(e => e.done === newTask.done);
      const inValid = this.props.tasks.find(e => {
        return (
          e.title === newTask.title &&
          e.detail === newTask.detail &&
          e.done === newTask.done
        );
      });

      if (inValid) {
        alert(
          "This task title and detail have been added before and not marked as done yet!"
        );
      } else {
        //        this.addNewTask(newTask);
        this.props.onAddTask(newTask);

        e.target.elements.title.value = "";
        e.target.elements.detail.value = "";
      }
    }

    e.preventDefault();
  };

  clearAllTasks = () => {
    if (window.confirm("Are you sure to delete ALL tasks?")) {
      axios.delete("/tasks.json");
    }
  };

  clearCompletedTasks() {
    if (window.confirm("Are you sure to delete all completed tasks?")) {
      this.props.tasks.forEach(e => {
        if (e.done) {
          axios.delete(`/tasks/${e.id2}.json`);
        }
      });
      // need to rerender after clearning the completed tasks so that the clear completed tasks button disappear
      //this.setState({ tasks: this.state.tasks})
    }
  }

  validationCheck = (type, input, re) => {
    if (!re.test(input)) {
      this.setState(({ isValid }) => ({
        isValid: {
          ...isValid,
          [type]: "is-invalid"
        }
      }));
    } else {
      this.setState(({ isValid }) => ({
        isValid: {
          ...isValid,
          [type]: "is-valid"
        }
      }));
    }
  };

  calculateClass = type => {
    const Type = this.state.isValid[type];

    let isValid = ["form-control"];

    if (Type === "is-invalid") {
      isValid.push("is-invalid");
    } else if (Type === "is-valid") {
      isValid.push("is-valid");
    }

    return isValid.join(" ");
  };

  async changeDone(id2) {
    const tasks = [...this.props.tasks],
      taskIndex = this.props.tasks.findIndex(e => e.id2 === id2);

    const task = { ...this.props.tasks[taskIndex] };
    task.done = task.done ? false : true;

    try {
      await axios.patch(`/tasks/${id2}.json`, { done: task.done });
      tasks[taskIndex] = task;
      this.setState({ tasks });
    } catch (err) {
      console.log(err);
    }
  }

  changeDateHandler = d => {
    this.setState({ date: d });
  };

  render = () => {
    return (
      // for testing some high order componenet wrapping the inner contenet
      <Aux>
        <React.Fragment>
          <>
            <Form
              getTasks={this.getInput}
              clc={this.calculateClass}
              clearLocalStorage={this.clearAllTasks}
              clearCompleted={this.clearCompletedTasks.bind(this)}
              changeDateHandler={this.changeDateHandler}
              selectedDate={this.state.date}
            />

            <Table
              changeDone={this.changeDone.bind(this)}
              showDone={this.state.showDone}
              clicked={this.openAccLi}
              cur={this.state.currentAccLi}
            />
          </>
        </React.Fragment>
      </Aux>
    );
  };
}

const mapStateToProps = state => {
  return {
    tasks: state.ts.tasks
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTasksInit: () => dispatch(actions.initTasks()),
    onAddTask: newTask => dispatch(actions.addTask(newTask)),
    onOpenAcco: date => dispatch(actions.openAccordion(date))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(todoStyle(App));
