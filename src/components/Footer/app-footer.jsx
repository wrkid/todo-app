import React from "react";
import PropTypes from "prop-types";
import TasksFilter from "../TasksFilter";

import "./app-footer.css";

function AppFooter({ counter, filter, changeFilter, deleteCompleted }) {
  const id = 1;
  return (
    <footer className="footer">
      <span className="todo-count">{`${counter} items left`}</span>
      <TasksFilter
        filter={filter}
        changeFilter={(value) => changeFilter(value)}
      />
      <button
        type="button"
        className="clear-completed"
        onClick={deleteCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
}

AppFooter.defaultProps = {
  counter: 0,
  filter: "All",
};

AppFooter.propTypes = {
  filter: PropTypes.string,
  counter: PropTypes.number,
  changeFilter: PropTypes.func.isRequired,
  deleteCompleted: PropTypes.func.isRequired,
};

export default AppFooter;
