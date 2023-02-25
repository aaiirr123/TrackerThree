import { useState } from 'react'
import './App.css'
import Button from '@mui/material/Button';
import Timer from './Timer'
import SpinningCube from './SpinningCube';



function App() {

  let startTime : number
  let stopTime : number

  function startTimer()
  {
    setActive( prevState => !prevState);
    startTime = Date.now();
  }

  function stopTimer()
  {
    stopTime = Date.now();
  }



  const [active, setActive] = useState(false);

  return (

    <div className="App">
      
      {active &&  <SpinningCube />}

      <h1>Tracker app</h1>

      {active && <Timer></Timer>}
      
      {<Button variant="contained" onClick={startTimer}>
        { !active && `Start `} 
        { active && `Stop `}
         Timer
      </Button>}
      
    </div>
  )
}

export default App

