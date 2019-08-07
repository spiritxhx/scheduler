import React, { useState, useEffect } from 'react';

export function useVisualMode(value) {
  const [mode, setMode] = useState(value);
  const [history, setHistory] = useState([value]);

  const transition = value2 => {
    setHistory([...history, value2]);    
    setMode(value2);
  }
  const back = () =>{
    setMode(history[history.length-2]);
    history.pop();
  }
  return { mode, transition, back };
}