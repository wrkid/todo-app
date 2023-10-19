import React from 'react';

import PropTypes from 'prop-types';

import './tasks-filter.css';

function TasksFilter({ filter, changeFilter }) {
  return (
    <ul className="filters">
      <li>
        <button
          type="button"
          className={filter === 'All' ? 'selected' : null}
          onClick={() => changeFilter('All')}
        >
          All
        </button>
      </li>
      <li>
        <button
          type="button"
          className={filter === 'Active' ? 'selected' : null}
          onClick={() => changeFilter('Active')}
        >
          Active
        </button>
      </li>
      <li>
        <button
          type="button"
          className={filter === 'Completed' ? 'selected' : null}
          onClick={() => changeFilter('Completed')}
        >
          Completed
        </button>
      </li>
    </ul>
  );
}

TasksFilter.defaultProps = {
  filter: 'All',
};

TasksFilter.propTypes = {
  filter: PropTypes.string,
  changeFilter: PropTypes.func.isRequired,
};

export default TasksFilter;
