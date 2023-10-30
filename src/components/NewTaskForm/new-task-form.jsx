import React, { useState, createRef } from 'react';

import './new-task-form.css';

import PropTypes from 'prop-types';

export default function NewTaskForm({ addTask }) {
  const [input, setInput] = useState('');
  const [inputMin, setInputMin] = useState('0');
  const [inputSec, setInputSec] = useState('0');

  const inputRef = createRef();
  const inputMinRef = createRef();
  const inputSecRef = createRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (input.trim() && Number(inputSec) < 60) {
      const secondsLeft = Number(inputMin) * 60 + Number(inputSec);
      addTask(input, secondsLeft);
      setInput('');
      setInputMin('0');
      setInputSec('0');
    } else {
      setInput('Your task here...');
    }
  };

  const handleChange = () => {
    setInput(inputRef.current.value);
    setInputMin(inputMinRef.current.value);
    setInputSec(inputSecRef.current.value);
  };

  return (
    <header>
      <h1>todos</h1>
      <form id="add_task_form" className="new-todo-form" onSubmit={(e) => handleSubmit(e)}>
        <input
          className="new-todo"
          ref={inputRef}
          id="inputValue"
          type="text"
          placeholder="What needs to be done...?"
          value={input}
          onChange={(e) => handleChange(e)}
        />
        <input
          className="new-todo-form__timer"
          ref={inputMinRef}
          id="valueMin"
          type="number"
          placeholder="Min"
          value={inputMin}
          onChange={(e) => handleChange(e)}
        />
        <input
          className="new-todo-form__timer"
          ref={inputSecRef}
          id="valueSec"
          type="number"
          placeholder="Sec"
          value={inputSec}
          onChange={(e) => handleChange(e)}
        />
        <button aria-label="submit-button" type="submit" />
      </form>
    </header>
  );
}

NewTaskForm.propTypes = {
  addTask: PropTypes.func.isRequired,
};
