import { React, Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import Timer from '../timer';
import './task.css';

class Task extends Component {
  constructor() {
    super();
    this.state = {
      editing: false,
      // pause: false
    };
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { value } = this.state;
    const { editTask } = this.props;
    if (value.trim()) {
      editTask(event.target.id, value);
    }
    this.setState(() => ({
      value: '',
    }));
    this.setState(() => ({ editing: false, value: '' }));
  }

  async onValueChange(event) {
    this.setState(() => ({
      value: event.target.value,
    }));
  }

  render() {
    const { todo, onDeleted, onToggleDone, timerOnGo } = this.props;
    const { id, done, description, secondsToDo, isPlayed, createdTime } = todo;
    const { editing } = this.state;
    let status;

    if (done) {
      status = 'completed';
    } else {
      status = 'active';
    }

    if (editing === true) {
      status = 'editing';
    }

    return (
      <li className={status}>
        <div className="view">
          <input
            className="toggle"
            id={id}
            type="checkbox"
            checked={done}
            onChange={onToggleDone}
          />
          <label htmlFor={id}>
            <span className="title">{description}</span>
            <span className="description">
              <Timer
                id={id}
                isPlayed={isPlayed}
                secondsToDo={secondsToDo}
                timerOnGo={(idT, timeLeft, isPlayedF) => timerOnGo(idT, timeLeft, isPlayedF)}
              />
            </span>
            <span className="description">{`created ${formatDistanceToNow(createdTime, {
              includeSeconds: true,
            })} ago`}</span>
          </label>
          <button
            type="button"
            aria-label="edit"
            className="icon icon-edit"
            onClick={() =>
              this.setState(() => ({
                editing: !editing,
                value: description,
              }))
            }
          />
          <button
            type="button"
            aria-label="delete"
            className="icon icon-destroy"
            onClick={() => {
              onDeleted(id);
            }}
          />
        </div>
        {status === 'editing' && (
          <form id={id} onSubmit={this.handleSubmit.bind(this)}>
            <input
              id={id}
              type="text"
              className="edit"
              defaultValue={description}
              onChange={(e) => this.onValueChange(e)}
            />
          </form>
        )}
      </li>
    );
  }
}

Task.defaultProps = {
  todo: {
    id: '0',
    done: false,
    description: 'empty task',
    secondsToDo: 0,
    createdTime: new Date(),
  },
};

Task.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string,
    done: PropTypes.bool,
    description: PropTypes.string,
    secondsToDo: PropTypes.number,
    isPlayed: PropTypes.bool.isRequired,
    createdTime: PropTypes.instanceOf(Date),
  }),
  onDeleted: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired,
  timerOnGo: PropTypes.func.isRequired,
};

export default Task;
