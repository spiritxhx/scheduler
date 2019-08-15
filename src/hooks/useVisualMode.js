import { useState } from "react";

export const useVisualMode = value => {
  const [mode, setMode] = useState(value);
  const [history, setHistory] = useState([value]);

  // transit the mode to another input mode
  const transition = (value2, replace) => {
    // if replace is true value, just replace the latest history
    if (replace) {
      history.pop();
      setHistory(prev => [...prev, value2]);
    } else {
      setHistory(prev => [...prev, value2]);
    }
    setMode(value2);
  };
  // get 1 step back in the history
  const back = () => {
    history.pop();
    if (history.length > 0) {
      setMode(history[history.length - 1]);
    }
  };
  return { mode, transition, back };
};
