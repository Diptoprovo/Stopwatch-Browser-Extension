import {useState, useEffect, useRef} from "react"

function Stopwatch(){

    const [isRunning, setRunning] = useState(false);
    const [elapsedTime, setElapsed] = useState(0);
    const [text, setText] = useState("Start");
    const [color, setColor] = useState("rgba(138, 249, 126, 0.5)")
    const intervalIdRef = useRef<number>(0);
    const startTimeRef = useRef(0);

    useEffect(() => {
        if(isRunning){
            intervalIdRef.current = setInterval(() => {
                setElapsed(Date.now() - startTimeRef.current);
            }, 10)
        }

        return () => {
            clearInterval(intervalIdRef.current);
        }

    }, [isRunning])

    function start(){
        setRunning(true);
        startTimeRef.current = Date.now() - elapsedTime;
    }

    function stop(){
        setRunning(false);
    }

    function reset(){
        setText("Start")
        setColor("rgba(138, 249, 126, 0.5)")
        setElapsed(0)
        setRunning(false);

    }

    function formatTime(){
        let hours = Math.floor(elapsedTime/(3600 * 1000));
        let minutes = Math.floor(elapsedTime/(60 * 1000)) % 60;
        let seconds = Math.floor(elapsedTime/(1000)) % 60;
        let millis = Math.floor(elapsedTime % 1000 /10);

        // hours = parseInt(String(hours).padStart(2,"0"));
        // minutes = parseInt(String(minutes).padStart(2,"0"));
        // seconds = parseInt(String(seconds).padStart(2,"0"));
        // millis =parseInt( String(millis).padStart(2,"0"));

        return `${String(hours).padStart(2,"0")}:${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}:${String(millis).padStart(2,"0")}`;
        
    }

    function startstop(){
        if(isRunning){ 
            setText("Start")
            setColor("rgba(138, 249, 126)")
            stop()
        }
        else{ 
            setText("Stop")
            setColor('rgba(241, 129, 129)')
            start()
        }
        
    }

    function hover(){
        // console.log(color.length)
        let newColor = color.substring(0,color.length-6) + ")"
        setColor(newColor)
    }

    function leave(){
        // console.log(color.length)
        let newColor = color.substring(0,color.length-1) + ", 0.5)"
        setColor(newColor)
    }


    return(
        <>
        <div className="stopwatch">
            <div className="display">{formatTime()}</div>
            <div className="controls">
                <button id="startStop" onClick={startstop} style={{backgroundColor: color}} onMouseEnter={hover} onMouseLeave={leave}>{text}</button>
                {/* <button className="start" onClick={start}>Start</button>
                <button className="stop" onClick={stop}>Stop</button> */}
                <button className="reset" onClick={reset}>Reset</button>
            </div>

        </div>
        
        </>
    )
}

export default Stopwatch