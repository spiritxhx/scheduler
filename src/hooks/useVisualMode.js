import { useState } from 'react';

export const useVisualMode = value => {
  const [mode, setMode] = useState(value);
  const [history, setHistory] = useState([value]);

  const transition = (value2, replace) => {
    if (replace) {
      history.pop();
      setHistory(prev => [...prev, value2]);
    } else {
      setHistory(prev => [...prev, value2]);
    }
    setMode(value2);
  }
  const back = () => {
    history.pop();
    if (history.length > 0) {
      setMode(history[history.length - 1]);
    }
  }
  return { mode, transition, back };
}