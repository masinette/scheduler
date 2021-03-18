import React, { Fragment, useState, useEffect } from "react";


// take in an initial mode
export default function useVisualMode(initial) {
// set the mode state with the initial mode provided
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

//add the mode to stack
  function transition(newMode) {
    setHistory((prevHistory)=> {
      setMode(newMode);
      const newHistory = [...prevHistory];
      newHistory.push(newMode);
      return newHistory;
    })
  }

// previous mode in stack
  const back = () => {
    setHistory((prevHistory)=> {
      if (prevHistory.length <= 1){
        return prevHistory;
      } else{
        const lastMode = prevHistory[prevHistory.length -2]
        setMode(lastMode);
        return prevHistory.filter((item, index)=>{
          return index !== prevHistory.length -1;
        })
      }
    })
  }


console.log({mode})
// return an object with a mode property
return { mode, transition, back };
}