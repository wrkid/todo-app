import React from 'react';
import PropTypes from 'prop-types';
import TaskList from '../TaskList';
import AppFooter from '../Footer';

function AppMain({
  todos,
  onDeleted,
  onToggleDone,
  counter,
  deleteCompleted,
  filter,
  changeFilter,
  editTask,
  timerOnGo,
}) {
  return (
    <section className="main">
      <TaskList
        todos={todos}
        onDeleted={(id) => onDeleted(id)}
        onToggleDone={(id) => onToggleDone(id)}
        editTask={(idE, newDescription) => editTask(idE, newDescription)}
        timerOnGo={(idT, timeLeft, isPlayedF) => timerOnGo(idT, timeLeft, isPlayedF)}
      />
      <AppFooter
        counter={counter}
        filter={filter}
        changeFilter={(value) => changeFilter(value)}
        deleteCompleted={() => deleteCompleted()}
      />
    </section>
  );
}

AppMain.defaultProps = {
  todos: [
    {
      id: '0',
      done: false,
      description: 'empty task',
      createdTime: new Date(),
    },
  ],
  counter: 0,
  filter: 'All',
};

AppMain.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)),
  counter: PropTypes.number,
  filter: PropTypes.string,
  onDeleted: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  deleteCompleted: PropTypes.func.isRequired,
  changeFilter: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired,
  timerOnGo: PropTypes.func.isRequired,
};

export default AppMain;
