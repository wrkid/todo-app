import React, { useState } from 'react';
import NewTaskForm from '../NewTaskForm';
import AppMain from '../app-main';
import './app.css';

export default function App() {
  const [todosData, setTodosData] = useState([]);
  const [filter, setFilter] = useState('All');
  const [maxId, setMaxId] = useState('1');

  const deleteTask = (id) => {
    const idx = todosData.findIndex((el) => el.id === id);
    clearInterval(todosData[idx].intervalId);
    const newData = [...todosData.slice(0, idx), ...todosData.slice(idx + 1)];
    setTodosData(newData);
  };

  const timerOnGo = (idT) => {
    setTodosData((prev) => {
      const idx = prev.findIndex((el) => el.id === idT);
      const oldTask = prev[idx];
      const newSecondsLeft = prev[idx].secondsLeft - 1;
      const newTask = { ...oldTask, secondsLeft: newSecondsLeft };
      const newArray = prev.with(idx, newTask);
      if (prev[idx].secondsLeft === 1) {
        clearInterval(prev[idx].intervalId);
      }
      return newArray;
    });
  };

  const timer = (id) => setInterval(() => timerOnGo(id), 1000);

  const createNewTask = (task, secondsLeft) => {
    const newId = maxId.toString();
    setMaxId((prev) => prev + 1);
    return {
      id: newId,
      done: false,
      description: task,
      secondsLeft,
      createdTime: new Date(),
    };
  };

  const addTask = (task, secondsLeft) => {
    let isPlayed = false;
    if (secondsLeft > 0) {
      isPlayed = true;
    } else {
      isPlayed = false;
    }
    const newTask = createNewTask(task, secondsLeft, isPlayed);
    if (secondsLeft > 0) {
      const interval = timer(newTask.id);
      newTask.intervalId = interval;
    }
    const newData = [...todosData, newTask];
    setTodosData(newData);
  };

  const onToggleDone = (id) => {
    const idx = todosData.findIndex((el) => el.id === id);
    const oldTask = todosData[idx];
    const newTask = { ...oldTask, done: !oldTask.done };
    const newArray = todosData.with(idx, newTask);
    setTodosData(newArray);
  };

  const deleteCompleted = () => {
    const newData = todosData.filter((todo) => !todo.done);
    todosData.filter((todo) => todo.done).forEach((todo) => clearInterval(todo.intervalId));
    setTodosData(newData);
  };

  const changeFilter = (v) => {
    setFilter(v);
  };

  const filteredTasks = () => {
    let filteredData;
    if (filter === 'All') {
      filteredData = todosData.filter((todo) => todo.description);
    } else {
      filteredData = todosData.filter((todo) => {
        if (filter === 'Active') {
          return !todo.done;
        }
        return todo.done;
      });
    }
    return filteredData;
  };

  const editTask = (idE, newDescription) => {
    const idx = todosData.findIndex((el) => el.id === idE);
    const oldTask = todosData[idx];
    const newTask = { ...oldTask, description: newDescription };
    const newArray = todosData.with(idx, newTask);
    setTodosData(newArray);
  };

  const timerStop = (id) => {
    const idx = todosData.findIndex((el) => el.id === id);
    clearInterval(todosData[idx].intervalId);
  };

  const timerPlay = (id) => {
    const idx = todosData.findIndex((el) => el.id === id);
    if (idx >= 0 && todosData[idx].secondsLeft > 0) {
      clearInterval(todosData[idx].intervalId);
      const interval = setInterval(() => timerOnGo(id), 1000);
      const oldTask = todosData[idx];
      const newTask = { ...oldTask, intervalId: interval };
      const newArray = todosData.with(idx, newTask);
      setTodosData(newArray);
    }
  };

  const todoCounter = todosData.filter((todo) => !todo.done).length;
  return (
    <section className="todoapp">
      <NewTaskForm addTask={addTask} />
      <AppMain
        todos={filteredTasks()}
        onDeleted={deleteTask}
        onToggleDone={onToggleDone}
        counter={todoCounter}
        filter={filter}
        changeFilter={changeFilter}
        deleteCompleted={deleteCompleted}
        editTask={editTask}
        timerStop={timerStop}
        timerPlay={timerPlay}
      />
    </section>
  );
}
