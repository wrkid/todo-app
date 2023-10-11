import { React, Component } from "react";
import NewTaskForm from "../NewTaskForm";
import AppMain from "../app-main";
import "./app.css";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      todosData: [],
      filter: "All",
    };
    this.maxId = 0;
  }

  deleteTask = (id) => {
    this.setState(({ todosData }) => {
      const idx = todosData.findIndex((el) => el.id === id);
      const newData = [...todosData.slice(0, idx), ...todosData.slice(idx + 1)];
      return {
        todosData: newData,
      };
    });
  };

  addTask = (task) => {
    this.setState(({ todosData }) => {
      const newTask = this.createNewTask(task);
      const newData = [...todosData, newTask];
      return {
        todosData: newData,
      };
    });
  };

  onToggleDone = (id) => {
    this.setState(({ todosData }) => {
      const idx = todosData.findIndex((el) => el.id === id);
      const oldTask = todosData[idx];
      const newTask = { ...oldTask, done: !oldTask.done };
      const newArray = todosData.with(idx, newTask);
      return {
        todosData: newArray,
      };
    });
  };

  deleteCompleted = () => {
    this.setState(({ todosData }) => {
      const newData = todosData.filter((todo) => !todo.done);
      return {
        todosData: newData,
      };
    });
  };

  changeFilter = (v) => {
    this.setState(() => ({ filter: v }));
  };

  filteredTasks = () => {
    const { todosData, filter } = this.state;
    let filteredData;
    if (filter === "All") {
      filteredData = todosData.filter((todo) => todo.description);
    } else {
      filteredData = todosData.filter((todo) => {
        if (filter === "Active") {
          return !todo.done;
        }
        return todo.done;
      });
    }
    return filteredData;
  };

  editTask = (idE, newDescription) => {
    this.setState(({ todosData }) => {
      const idx = todosData.findIndex((el) => el.id === idE);
      const oldTask = todosData[idx];
      const newTask = { ...oldTask, description: newDescription };
      const newArray = todosData.with(idx, newTask);
      return {
        todosData: newArray,
      };
    });
  };

  createNewTask(task) {
    this.maxId += 1;
    const newId = this.maxId.toString();
    return {
      id: newId,
      done: false,
      description: task,
      createdTime: new Date(),
    };
  }

  render() {
    const { todosData, filter } = this.state;
    const todoCounter = todosData.filter((todo) => !todo.done).length;
    return (
      <section className="todoapp">
        <NewTaskForm addTask={this.addTask} />
        <AppMain
          todos={this.filteredTasks()}
          onDeleted={this.deleteTask}
          onToggleDone={this.onToggleDone}
          counter={todoCounter}
          filter={filter}
          changeFilter={this.changeFilter}
          deleteCompleted={this.deleteCompleted}
          editTask={this.editTask}
        />
      </section>
    );
  }
}
