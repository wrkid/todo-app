import React from 'react';

import PropTypes from 'prop-types';

export default class Timer extends React.Component {
  constructor() {
    super();
    this.state = {
      secondsToDo: null,
    };
  }

  componentDidMount() {
    const { id, secondsToDo, isPlayed } = this.props;
    if (secondsToDo) {
      const lastTime = localStorage.getItem(id.toString());
      if (lastTime) {
        const last = new Date(lastTime);
        const now = new Date();
        const toGo = secondsToDo - Math.floor((now.getTime() - last.getTime()) / 1000);
        localStorage.removeItem(id.toString());
        if (toGo > 0 && isPlayed) {
          this.setState({
            secondsToDo: toGo,
          });
        } else {
          this.setState({
            secondsToDo,
          });
        }
      } else {
        this.setState({
          secondsToDo,
        });
      }
      if (isPlayed) this.interval = setInterval(this.updateTimer, 1000);
    }
  }

  componentWillUnmount() {
    const { id, timerOnGo } = this.props;
    const { secondsToDo } = this.state;
    if (secondsToDo > 0) {
      localStorage.setItem(id, new Date());
    }
    timerOnGo(id, secondsToDo, false);
    clearInterval(this.interval);
  }

  updateTimer = () => {
    const { secondsToDo } = this.state;
    const newTime = secondsToDo - 1;
    if (newTime === 0) {
      clearInterval(this.interval);
    }
    this.setState(() => ({
      secondsToDo: newTime,
    }));
  };

  timerOnPause = () => {
    const { id, timerOnGo } = this.props;
    const { secondsToDo } = this.state;
    timerOnGo(id, secondsToDo, false);
    clearInterval(this.interval);
  };

  timerOnPlay = () => {
    const { secondsToDo } = this.props;
    if (secondsToDo) {
      this.setState({
        secondsToDo,
      });
      this.interval = setInterval(this.updateTimer, 1000);
    }
  };

  getTimeStr = () => {
    const { secondsToDo } = this.state;
    const newMin = Math.floor(secondsToDo / 60);
    const newSec = secondsToDo - newMin * 60;
    return `${newMin}:${newSec}`;
  };

  render() {
    const { secondsToDo } = this.props;
    if (!secondsToDo) {
      return null;
    }
    const time = this.getTimeStr();

    return (
      <span className="description">
        <button
          aria-label="icon-play"
          type="button"
          className="icon icon-play"
          onClick={this.timerOnPlay}
        />
        <button
          aria-label="icon stop"
          type="button"
          className="icon icon-pause"
          onClick={this.timerOnPause}
        />
        {time}
      </span>
    );
  }
}

Timer.defaultProps = {
  secondsToDo: 0,
};
Timer.propTypes = {
  id: PropTypes.string.isRequired,
  secondsToDo: PropTypes.number,
  isPlayed: PropTypes.bool.isRequired,
  timerOnGo: PropTypes.func.isRequired,
};
