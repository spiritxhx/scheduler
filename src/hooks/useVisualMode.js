import React, { useState } from 'react';

export function useVisualMode(value) {
  const [mode, setMode] = useState(value);
  const [history, setHistory] = useState([value]);

  const transition = (value2, replace) => {
    if (replace) {
      history.pop();
      history.push(value2);
      setMode(value2);
    } else {
      setHistory([...history, value2]);
      setMode(value2);
    }
  }
  const back = () => {
    history.pop();
    if (history.length > 0) {
      setMode(history[history.length - 1]);
    }
  }
  return { mode, transition, back };
}