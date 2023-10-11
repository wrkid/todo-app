import React, { Component } from "react";

import PropTypes from "prop-types";

import "./new-task-form.css";

class NewTaskForm extends Component {
  constructor() {
    super();
    this.state = {
      value: "",
    };
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { value } = this.state;
    const { addTask } = this.props;
    if (value.trim()) addTask(value);
    this.setState(() => ({
      value: "",
    }));
  }

  async onValueChange(event) {
    this.setState(() => ({
      value: event.target.value,
    }));
  }

  render() {
    const { value } = this.state;
    return (
      <header>
        <form id="add_task_form" onSubmit={this.handleSubmit.bind(this)}>
          <h1>todos</h1>
          <input
            className="new-todo"
            id="add_task_form"
            type="text"
            placeholder="What needs to be done...?"
            value={value}
            onChange={(e) => this.onValueChange(e)}
          />
        </form>
      </header>
    );
  }
}

NewTaskForm.propTypes = {
  addTask: PropTypes.func.isRequired,
};

export default NewTaskForm;
