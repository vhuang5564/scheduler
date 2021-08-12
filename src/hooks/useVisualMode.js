import { useState } from "react"

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(mode, replace = false) {
    // adds array to history
    setHistory(prev => [...prev, mode])
    setMode(mode)

    if (replace) {
      setMode(mode);
      setHistory([initial])
    }
  }

  function back() {

    const histLength = history.length-2

    // disallows empty history array
    if (history.length <= 1) {
      setMode(initial)
    } else {
      setMode(history[histLength])
    }
    // removes last array
    setHistory(history.slice(0, history.length-1))
  }


  return { mode, transition, back };
}
