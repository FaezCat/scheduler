import { useState, useCallback } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // this function is utilized to change the state of each appointment which has a subsequent visual impact on the page itself
  // additonally, the "history" state keeps an ongoing record of our modes which enables the "back" function below
  const transition = useCallback(
    (newMode, replace = false) => {
      if (replace) {
        setMode(newMode);
        const newHistory = [...history];
        newHistory[newHistory.length - 1] = newMode;
        setHistory(newHistory);
      } else {
        setMode(newMode);
        setHistory([...history, newMode]);
      }
    },
    [history]
  );

  // this function enables us to go "back" with regards to our states (ex. if you edit an appointment and then cancel the edits, it will take you back to the previous mode)
  function back() {
    if (history.length > 1) {
      const modes = [...history];
      modes.pop();
      setHistory(modes);
      setMode(modes[modes.length - 1]);
    }
  }
  // console.log({ mode, initial });
  return { mode, transition, back };
}
