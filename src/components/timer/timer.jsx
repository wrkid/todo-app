import React, { useEffect } from 'react';

import PropTypes from 'prop-types';

export default function Timer({ id, secondsLeft, timerStop, timerPlay }) {
  useEffect(() => {}, [secondsLeft]);

  const getTimeStr = () => {
    let newMin = Math.floor(secondsLeft / 60);
    if (newMin.toString().length === 1) {
      newMin = 0 + newMin.toString();
    }
    let newSec = secondsLeft - newMin * 60;
    if (newSec.toString().length === 1) {
      newSec = 0 + newSec.toString();
    }
    return `${newMin}:${newSec}`;
  };

  if (!secondsLeft) return null;

  const time = getTimeStr();

  return (
    <span className="description">
      <button
        aria-label="icon-play"
        type="button"
        className="icon icon-play"
        onClick={() => timerPlay(id)}
      />
      <button
        aria-label="icon stop"
        type="button"
        className="icon icon-pause"
        onClick={() => timerStop(id)}
      />
      {time}
    </span>
  );
}

Timer.defaultProps = {
  secondsLeft: 0,
};
Timer.propTypes = {
  id: PropTypes.string.isRequired,
  secondsLeft: PropTypes.number,
  timerStop: PropTypes.func.isRequired,
  timerPlay: PropTypes.func.isRequired,
};
