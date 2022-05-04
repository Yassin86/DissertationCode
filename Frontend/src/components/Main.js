import { useState, useEffect } from 'react'
import {GrNext, GrPrevious, GrClose} from 'react-icons/gr'
import {VscDebugRestart} from 'react-icons/vsc'
import { FaPlay, FaPause } from 'react-icons/fa'
import Slider from '@mui/material/Slider'
import Log from './Log'
import Tape from './Tape'
import StateMachine from './StateMachine'

const Main = ({ machine, getLog }) => {
    
    const [input, setInput] = useState('')
    const [log, setLog] = useState([])
    const [count, setCount] = useState(0)
    const [show, setShow] = useState(1)
    const [play, setPlay] = useState(false)
    const [time, setTime] = useState(1)
    const [arrows, setArrows] = useState(true)
    const [diagram, setDiagram] = useState(true)


    useEffect(() => {
        setTimeout(() => {
          if (count < log.length - 1 && play) {
              setCount(count + 1)
              if (show === count + 1) setShow(show + 1)
            }
        }, time * 1000);
    }, [play, log.length, count, show]);


    const onSubmit = (e) => {
        e.preventDefault()

        if (!input) {
            alert('Please enter input string!')
            return
        }

        if (!([...input].every(c => machine.alphabet.includes(c)))) {
            alert('String not made up of alphabet defined!')
            setInput("")
            return
        }
        
        let data = getLog(machine.machineID, input)
        data.then(function(data) {
            if (typeof(data) === "string") {
                alert(data)
            }
            else {
                setLog(data)
            }
        })

        setInput('')
        setShow(1)
        setCount(0)
        setPlay(false)
    }

    const tapeNext = () => {
        if (count < log.length - 1) {
            setCount(count + 1)
            if (show === count + 1) setShow(show + 1)
        }
        else {
            if (machine.halting.some(state => state === log[count][1])) {
                alert("You have reached the halting state!")
            }
            else {
                alert("This machine doesn't halt!")
            }
        }
    }

    const tapePrev = () => {
        if (count > 0) {
            setCount(count - 1)
        }
        else {
            alert("You are at the starting state!")
        }
    }

    const logClick = (index) => {
        setCount(index)
        setPlay(false)
    }

    const reset = () => {
        setCount(0)
        setShow(1)
        setPlay(false)
    }

    return (
        <div>
            <div className='input-section'>
                <form className='input' onSubmit={onSubmit}>
                    <input className='input-tm' type='text' value={input} onChange={(e) => setInput(e.target.value)} placeholder='Input String'/>
                    <input type='submit' value='LOAD' className='button'/>
                </form>
            </div>
            <div className='state-machine-container'>
                <button className='' onClick={() => setDiagram(!diagram)}>{diagram ? "Hide Diagram" : "Show Diagram"}</button>
                {diagram && <button className='arrow-button' onClick={() => setArrows(!arrows)}>{arrows ? "Hide Arrows" : "Show Arrows"}</button>}
                {diagram && <StateMachine machine={machine} arrows={arrows} />}
            </div>
            <div className='reset-container'>
                {log.length > 0 && <VscDebugRestart className='reset' size={40} onClick={reset} />}
                {log.length > 0 && <GrClose className='reset' size={40} onClick={() => setLog([])} />}
            </div>
            <div className='tape-container'>
                {log.length > 0 && <Tape content={log[count][2]} head={log[count][0]} />}
            </div>
            <div className='tape-buttons'>
                {log.length > 0 && <GrPrevious className='tape-button' size={30} onClick={tapePrev} />}
                {log.length > 0 && !play > 0 && <FaPlay className='tape-button' size={30} onClick={() => setPlay(!play)} />}
                {log.length > 0 && play > 0 && <FaPause className='tape-button' size={30} onClick={() => setPlay(!play)} />}
                {log.length > 0 && <GrNext className='tape-button' size={30} onClick={tapeNext} />}
            </div>
            <div className='slider'>
                { log.length > 0 &&
                    <Slider 
                        sx={{ width: 300 }} 
                        valueLabelDisplay='auto' 
                        valueLabelFormat={x => `${x} s`} 
                        min={0.25} max={5} step={0.25} value={time} 
                        onChange={(_, newValue) => setTime(newValue)} 
                    /> 
                }
            </div>
            <div className='state'>
                {log.length > 0 && <p>State: {log[count][1]}</p>}
            </div>
            <div className='logs'>
                {log.length > 0 && log.slice(0,show).map((l, index) => <Log key={index} i={index} l={l} onClick={logClick} />)}
            </div>
        </div>
    )
}
 
export default Main