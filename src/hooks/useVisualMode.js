import React from "react";

import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    if (replace) {
      setMode(newMode);
      const newHistory = [...history];
      newHistory[newHistory.length - 1] = newMode;
      setHistory(newHistory);
    } else {
      setMode(newMode);
      setHistory([...history, newMode]);
    }
  }

  function back() {
    if (history.length > 1) {
      const modes = [...history];
      modes.pop();
      setHistory(modes);
      setMode(modes[modes.length - 1]);
    }
  }

  return { mode, transition, back };
}
