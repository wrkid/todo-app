import React from 'react';
import PropTypes, { any } from 'prop-types';

import Task from '../Task';

import './task-list.css';

function TodoList({ todos, onDeleted, onToggleDone, editTask, timerStop, timerPlay }) {
  const todoList = todos.map((todo) => {
    const { id } = todo;
    return (
      <Task
        key={id}
        todo={todo}
        onDeleted={() => onDeleted(id)}
        onToggleDone={() => onToggleDone(id)}
        editTask={(idE, newDescription) => editTask(idE, newDescription)}
        timerStop={(idP) => timerStop(idP)}
        timerPlay={(idP) => timerPlay(idP)}
      />
    );
  });

  return <ul className="todo-list">{todoList}</ul>;
}

TodoList.defaultProps = {
  todos: [
    {
      id: '0',
      done: false,
      description: 'empty task',
      secondsLeft: 0,
      createdTime: new Date(),
    },
  ],
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.objectOf(any)),
  onDeleted: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired,
  timerStop: PropTypes.func.isRequired,
  timerPlay: PropTypes.func.isRequired,
};

export default TodoList;
