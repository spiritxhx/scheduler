import React, {useState, useEffect} from 'react';

export function useVisualMode(value) {
  const [mode, setMode] = useState(value);
  function transition(value2) {
    setMode(value2);
  }
  return {
    mode,
    transition
  }
}