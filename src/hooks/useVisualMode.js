import React, { Fragment, useState, useEffect } from "react";


// take in an initial mode
export default function useVisualMode(initial) {
// set the mode state with the initial mode provided
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false){
    if (replace){
      back();
    }
    setHistory((prevHistory)=> {
      setMode(newMode);
      const newHistory = [...prevHistory];
      newHistory.push(newMode);
      return newHistory;
    })
  }

// current mode in stack
  const back = () => {
    setHistory((prevHistory)=> {
      //if there is 0 or 1 mode in the array, return it as is
      if (prevHistory.length <= 1){
        return prevHistory;
      } else{
        //get value for previous mode, and setMode to this value
        const lastMode = prevHistory[prevHistory.length -2]
        setMode(lastMode);
        //return previous mode ARRAY, minus the current mode
        return prevHistory.filter((item, index)=>{
          return index !== prevHistory.length -1;
        })
      }
    })
  }


// console.log({mode})
// return an object with a mode property
return { mode, transition, back };
}