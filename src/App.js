import React, { PureComponent } from "react";
import axios from './components/axios-tasks'

import classes from "./App.module.css";
import './App.css'
import { Table } from "./components/Table";
import { Form } from "./components/Form";
import { Aux } from './hoc/hoc'

import "react-datepicker/dist/react-datepicker.css";


// Comments are usually another way of doing the same thing after or before that comment (and mostly in ES5 or less recommended way).


class App extends PureComponent {
  state = {
    date: new Date(),
    viewDate: null,
    showDone: false,
    tasks: [],
    isValid: {
      title: '',
      detail: ''
    },
    currentAccLi: {
      date: null,
      open: false
    }
  };

  componentDidMount() {

    const tasks = [];
    const today = this.getToday();

    const fbTasks = axios.get('/tasks.json');

    fbTasks.then(res => {

      for (let id in res.data) {
        tasks.push({
          id2: id,
          ...res.data[id]
        });
      };

      this.setState({
        tasks,
        currentAccLi: {
          date: today,
          open: true
        }
      });

    })
  };

  getToday = () => {
    const getToday = new Date(),
      getTheDay = getToday.getDate(),
      getTheMonth = getToday.getMonth() + 1,
      getTheYear = getToday.getFullYear();

    return `${getTheDay}/${getTheMonth}/${getTheYear}`;
  }


  addNewTask = newTask => {
    // const tasks = this.state.tasks.slice();
    // tasks.push(newTask);

    const task = {
      ...newTask
    }

    axios.post('/tasks.json', task)

    const tasks = [...this.state.tasks, newTask];
    this.setState({ tasks, currentAccLi: { date: task.viewDate, open: true } });
  };

  getMaxId = () => {
    let tasks = [...this.state.tasks],
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

    const reTitle = /^[a-zA-z ]{2,12}$/;
    const reDetail = /^[a-zA-z ]{5,35}$/;

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
      const inValid = this.state.tasks.find(e => {
        return e.title === newTask.title && e.detail === newTask.detail && e.done === newTask.done
      })

      if (inValid) {
        alert("This task title and detail have been added before and not marked as done yet!");
      } else {
        this.addNewTask(newTask);

        e.target.elements.title.value = "";
        e.target.elements.detail.value = "";
      }
    }

    e.preventDefault();
  };

  deleteTask = delId => {
    const tasks = [...this.state.tasks],
      task = { ...tasks.filter(elem => elem.id2 === delId) },
      otherTasks = [...tasks.filter(elem => elem.id2 !== delId)];

    const taskTitle = task[0].title;

    if (window.confirm(`Are you sure to delete ${taskTitle}?`)) {
      axios.delete('/tasks/' + delId + '.json').then(res => {
        console.log('deleted')
        this.setState({ tasks: otherTasks })
      }).catch(err => console.log(err));
    }

  };

  clearAllTasks = () => {
    if (window.confirm("Are you sure to delete ALL tasks?")) {
      axios.delete('/tasks.json')
    }
  };

  clearCompletedTasks() {
    if (window.confirm("Are you sure to delete all completed tasks?")) {

      this.state.tasks.forEach(e => {
        if (e.done) {
          axios.delete(`/tasks/${e.id2}.json`);
        }
      })
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

    const tasks = [...this.state.tasks],
      taskIndex = this.state.tasks.findIndex(e => e.id2 === id2);

    const task = { ...this.state.tasks[taskIndex] };
    task.done = task.done ? false : true;

    try {

      await axios.patch(`/tasks/${id2}.json`, { done: task.done });
      tasks[taskIndex] = task;
      this.setState({ tasks });

    } catch (err) {
      console.log(err)
    }
  };

  showDoneHandler = e => {
    let newDoneState = this.state.showDone ? false : true;
    this.setState({ showDone: newDoneState });
    e.preventDefault()
  }

  changeDateHandler = (d) => {
    this.setState({ date: d });
  }

  openAccLi = (date) => {

    // * If you have an opened accordion and you click on another one, the new clicked accordion tap will be 
    // opened and the previous one will be closed.
    // * Withouth this condition, the current opened accordion will just be closed by click on a new accordion tap
    // and the new one won't be opened instantly.

    // So this condition simply, will always open the new clicked accodrion tap when clicking on a different date accordion tap, while it will toggle on same date click accordion tap.
    if (this.state.currentAccLi.date !== date && this.state.currentAccLi.open) {
      this.setState({
        currentAccLi: {
          open: true,
          date
        }
      })
      return;
    }

    // Toggle the status of currently opened accordion tap (open/close)
    this.setState(({ currentAccLi }) => ({
      currentAccLi: {
        open: !currentAccLi.open,
        date
      }
    }))

  }

  render = () => {
    return (
      // for testing some high order componenet wrapping the inner contenet
      <Aux>
        <React.Fragment>
          <>

            <div className={[classes['App-class'], classes.App2].join(' ')}>
              <div className={"container my-5"} style={{ border: "1px solid #ccc" }}>
                <div className="row">
                  <div className="col-lg-12 col-sm-12">

                    <Form
                      getTasks={this.getInput}
                      tasks={this.state.tasks}
                      clc={this.calculateClass}
                      clearLocalStorage={this.clearAllTasks}
                      clearCompleted={this.clearCompletedTasks.bind(this)}
                      changeDateHandler={this.changeDateHandler}
                      selectedDate={this.state.date}
                    />

                    <Table
                      tasks={this.state.tasks}
                      deleteTask={this.deleteTask}
                      delTaskByIndex={this.deleteTaskByIndex}
                      changeDone={this.changeDone.bind(this)}
                      showDone={this.state.showDone}
                      showDoneClick={this.showDoneHandler}
                      clicked={this.openAccLi}
                      cur={this.state.currentAccLi} />

                  </div>
                </div>
              </div>
            </div>

          </>
        </React.Fragment>
      </Aux>


    );
  };
}

export default App;
