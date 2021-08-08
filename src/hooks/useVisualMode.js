import { useState } from "react"

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial); // FIRST
  const [history, setHistory] = useState([initial]);

  function transition(mode, replace = false) { // SECOND
    setHistory(prev => [...prev, mode]) // adds array to history
    setMode(mode)

    if (replace) {
      setMode(mode);
      setHistory([initial])
    }

  }

  function back() {
    const histLength = history.length-2

    if (history.length <= 1) {
      setMode(initial)
    } else {
      setMode(history[histLength])
    }
    setHistory(history.slice(0, history.length-1)) // removes last array
  }


  return { mode, transition, back };
}