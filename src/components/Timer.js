import React, { useState, useEffect } from 'react';

function Timer ({ mm, timer }) {

  const [minutes, setMinutes] = useState(parseInt(mm));

  const [seconds, setSeconds] = useState(parseInt(0));

  useEffect(() => {
    const countdown = setInterval(() => {
      if (parseInt(seconds) > 0) {
        setSeconds(parseInt(seconds) - 1);
      }
      if (parseInt(seconds) === 0) {
        if (parseInt(minutes) === 0) {
            clearInterval(countdown);
            timer();
        } else {
          setMinutes(parseInt(minutes) - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(countdown);
    };
  }, [minutes, seconds]);


  return (
    <div>{minutes}: {seconds < 10 ? `0${seconds}` : seconds}</div>
  )
}

export default Timer;