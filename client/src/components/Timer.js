import React,{useState} from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import Button from 'react-bootstrap/Button';

export default function Timer() {

    const [sessionTimer,setSessionTimer] = useState(25);
    const [sessionCounter,setSessionCounter] = useState(4);
    //State to start/pause timer
    const [sessionStarts,setSessionStarts] = useState(false);
    const [sessionTitle,setSessionTitle] = useState("Start");
    const [breakTimer,setBreakTimer] = useState(5);
    const [isInSession,setIsInSession] = useState(false);
    const [completeTimer,setCompleteTimer] = useState(false);

    const onClick = () => {
        setSessionStarts(true);
        setSessionTitle("Pause");
        if(sessionStarts===true){
            setSessionStarts(false);
            setSessionTitle("Start");
        }
    };


    
    return (
        <div>
            <CountdownCircleTimer
    onComplete={() => {
      // do your stuff here
      setCompleteTimer(true);
      console.log(completeTimer);
      return [true, 1500] // repeat animation in 1.5 seconds
    }}
    isPlaying = {sessionStarts}
    duration={10}
    colors="#A30000"
  />
  <Button variant="outline-danger" onClick={()=>onClick()}>{sessionTitle}</Button>
        </div>
    );
}