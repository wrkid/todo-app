import React, { Component } from 'react';

import PropTypes from 'prop-types';

import './new-task-form.css';

class NewTaskForm extends Component {
  constructor() {
    super();
    this.state = {
      inputValue: '',
      valueMin: '0',
      valueSec: '0',
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    const { inputValue, valueMin, valueSec } = this.state;
    const { addTask } = this.props;
    if (inputValue.trim() && Number(valueSec) < 60) {
      const secondsToDo = Number(valueMin) * 60 + Number(valueSec);
      addTask(inputValue, secondsToDo); // valueMin, valueSec
      this.setState(() => ({
        inputValue: '',
        valueMin: '',
        valueSec: '',
      }));
    } else {
      this.setState(() => ({
        inputValue: 'Your task ...',
      }));
    }
  }

  async onValueChange(event) {
    const value = event.target.id;
    this.setState(() => ({
      [value]: event.target.value,
    }));
  }

  render() {
    const { inputValue, valueMin, valueSec } = this.state;
    return (
      <header>
        <h1>todos</h1>
        <form id="add_task_form" className="new-todo-form" onSubmit={(e) => this.handleSubmit(e)}>
          <input
            className="new-todo"
            id="inputValue"
            type="text"
            placeholder="What needs to be done...?"
            value={inputValue}
            onChange={(e) => this.onValueChange(e)}
          />
          <input
            className="new-todo-form__timer"
            id="valueMin"
            type="number"
            placeholder="Min"
            value={valueMin}
            onChange={(e) => this.onValueChange(e)}
          />
          <input
            className="new-todo-form__timer"
            id="valueSec"
            type="number"
            placeholder="Sec"
            value={valueSec}
            onChange={(e) => this.onValueChange(e)}
          />
          <button aria-label="submit-button" type="submit" />
        </form>
      </header>
    );
  }
}

NewTaskForm.propTypes = {
  addTask: PropTypes.func.isRequired,
};

export default NewTaskForm;
