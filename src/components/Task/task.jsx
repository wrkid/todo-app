import { React, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import Timer from '../timer';
import './task.css';

export default function Task({ todo, onDeleted, editTask, onToggleDone, timerStop, timerPlay }) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (value.trim()) {
      editTask(event.target.id, value);
    }
    setEditing(false);
    setValue('');
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const { id, done, description, secondsLeft, createdTime } = todo;

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
        <input className="toggle" id={id} type="checkbox" checked={done} onChange={onToggleDone} />
        <label htmlFor={id}>
          <span className="title">{description}</span>
          <span className="description">
            <Timer
              id={id}
              secondsLeft={secondsLeft}
              timerStop={(idS) => timerStop(idS)}
              timerPlay={(idP) => timerPlay(idP)}
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
          onClick={() => {
            setEditing(() => !editing);
            setValue(description);
          }}
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
        <form id={id} onSubmit={handleSubmit.bind(this)}>
          <input
            id={id}
            type="text"
            className="edit"
            defaultValue={description}
            onChange={(e) => handleChange(e)}
          />
        </form>
      )}
    </li>
  );
}

Task.defaultProps = {
  todo: {
    id: '0',
    done: false,
    description: 'empty task',
    secondsLeft: 0,
    createdTime: new Date(),
  },
};

Task.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string,
    done: PropTypes.bool,
    description: PropTypes.string,
    secondsLeft: PropTypes.number,
    createdTime: PropTypes.instanceOf(Date),
  }),
  onDeleted: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired,
  timerStop: PropTypes.func.isRequired,
  timerPlay: PropTypes.func.isRequired,
};
