import React,{useState,useEffect} from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import Button from 'react-bootstrap/Button';
import {Container,Row,Col} from 'react-bootstrap';

export default function Timer({addBadgerBucks}) {
    
////////////////////////////////////////
    function TimerOptions(){
        

        //For sessions

        const [sessionComplete,setSessionComplete] = useState(false);
        const [numOfSession,setNumOfSession] = useState(1);
        const [sessionStart,setSessionStart] = useState(false);
        const [sessionState,setSessionState] = useState("Start Badgerdoro");
        

        //For breaks

        const [breakComplete,setBreakComplete] = useState(false);
        const [breakStart,setBreakStart] = useState(true);
        const [breakState,setBreakState] = useState("Pause Badgerdoro");

        const sessionChildren = ({ remainingTime }) => {
            const minutes = Math.floor(remainingTime / 60);
            const seconds = remainingTime % 60;

            const outputMinutes = (minutes<10?'0' : '')+minutes;
            const outputSeconds = (seconds<10?'0' : '')+seconds;

            let outputPhrase = '';

            switch(numOfSession){
                case 1:
                    outputPhrase =  <p>Let's get focused!</p>;
                    break;
                case 2:
                    outputPhrase = <p>Two is your number for the day.</p>;
                    break;
                case 3:
                    outputPhrase = <p>You are so three!</p>;
                    break;
                case 4:
                    outputPhrase = <p>Amazing!</p>
                    break;
            };
        

            

            const output = <div className="text-center"><h1>{outputMinutes} : {outputSeconds}</h1>{outputPhrase}</div>
          
            return output
          };
        //Start/Pause the Session timer
        const onClickSession = () => {
            if(sessionStart === false){
                setSessionStart(true);
                setSessionState("Pause Badgerdoro");}
            else{
                setSessionStart(false);
                setSessionState("Start Badgerdoro");
            }
            
        };


        const  sessionIsComplete = async () =>{
            addBadgerBucks();
            setSessionComplete(!sessionComplete);
            setSessionStart(!sessionStart);
            setNumOfSession(numOfSession+1);
                
            
        }

        const breakIsComplete = () =>{
            setBreakComplete(!breakComplete);
            setSessionStart(!sessionStart);
            setSessionState("Start Badgerdoro");
            setSessionComplete(!sessionComplete);
        }

        //Start/Pause the break timer
        const onClickBreak = () => {
            if(breakStart === false){
                setBreakStart(true);
                setBreakState("Pause Badgerdoro");}
            else{
                setBreakStart(false);
                setBreakState("Start Badgerdoro");
            }
            
        };

        //Reset timer
        const onClickReset = () => {
           setSessionComplete(false);
           setNumOfSession(1);
           setSessionStart(false);
           setSessionState("Start Badgerdoro");
            
        };

        const firstDiv = <div><div class="d-flex justify-content-center"><CountdownCircleTimer
        onComplete={() => {
          // do your stuff here
            sessionIsComplete();
            console.log(numOfSession);
    
    
          return [false, 0] // repeat animation in 1.5 seconds
        }}
        isPlaying = {sessionStart}
        colors = "#f15156"
        duration={3}
        children = {(remainingTime) => sessionChildren(remainingTime)}
        size={300}
      /></div>
      <div class= "d-flex justify-content-center "><Button variant="outline-danger mt-4  "  onClick={()=>onClickSession()}>{sessionState}</Button></div>

      
      </div>;

      const secondDiv = <CountdownCircleTimer 
      onComplete={() => {
        // do your stuff here
          breakIsComplete();
  
  
        return [false, 0] // repeat animation in 1.5 seconds
      }}
      isPlaying = {breakStart}
      duration={5}
      colors="#f15156"
      children = {(remainingTime) => sessionChildren(remainingTime)}
      size={300}/>
    ;

    const thirdDiv = <div><h4 class="text-center">Congratulations!! You have completed all 4 Badgerdoro sessions.</h4><div class="d-flex justify-content-center"><Button variant="outline-danger mt-4  "  onClick={()=>onClickReset()}>Reset Badgerdoro</Button></div></div>
        
        if(!sessionComplete){
            return(firstDiv);
            
        }
        else if(numOfSession===5){
            return(thirdDiv);
        }
        else{
            console.log(sessionComplete, breakStart);
            return(secondDiv);
        }

        
        };
///////////////////////////////////////////
    return (
        <div>
            <Container>
                <Row  className="justify-content-center mt-4"><Col xs={12} className="d-flex justify-content-center"><TimerOptions/></Col></Row>
            </Container>
            
        </div>
    )
}
