import {useState} from 'react'
import TextField from '@mui/material/TextField';
import {AiOutlinePlus} from 'react-icons/ai'

const NewMachine = ({ machine, addMachine }) => {
    
    const [name, setName] = useState(machine ? machine.machineID : '')
    const [alphabet, setAlphabet] = useState(machine ? machine.alphabet : [])
    const [states, setStates] = useState(machine ? machine.states : [])
    const [halting, setHalting] = useState(machine ? machine.halting : [])
    const [transition, setTransition] = useState(machine ? machine.transition_function : [""])

    const onSubmit = () => {
        if (!name || !alphabet || !states || !halting) {
            alert('Please fill in all fields!')
            return
        }

        if (!halting.every(c => states.includes(c))) {
            alert('Halting state must be one of the defined states!')
            return
        }

        if (!transition.filter(t => t).every(t => correctFormat(t))) {
            alert('Incorrect transition function format!')
            setTransition(machine ? machine.transition_function : [""])
            return
        }

        if (!getStates(transition.filter(t => t)).every(s => states.includes(s))) {
            alert('Transition function states must be defined in \'States\'')
            setTransition(machine ? machine.transition_function : [""])
            return
        }

        if (!getAlphabet(transition.filter(t => t)).every(a => alphabet.concat(['<','>',' ','*']).includes(a))) {
            alert('Transition function letters must be defined in \'Alphabet\'')
            setTransition(machine ? machine.transition_function : [""])
            return
        }

        addMachine(
            name,
            alphabet.map(a => a.trim()),
            states.map(s => s.trim()), 
            halting.map(h => h.trim()), 
            transition.filter(t => t)
        )
    }

    const correctFormat = (tf) => {
        const split = tf.split(';')
        return split.length === 2 && split[0].split(':').length === 2 && split[1].split(':').length === 2 ? true : false
    }

    const getStates = (tf) => {
        return [].concat(...tf.map(t => t.split(';').map(s => s.split(':')[0])))
    }

    const getAlphabet = (tf) => {
        return [].concat(...tf.map(t => t.split(';').map(s => s.split(':')[1])))
    }

    const changeTransition = (index, value) => {
        let trans = [...transition]
        trans[index] = value
        setTransition(trans)
    }

    return (
        <div className='add-machine'>
            <TextField className='machine-param' value={name} onChange={(e) => setName(e.target.value)} label='Name' />
            <TextField className='machine-param' value={alphabet} onChange={(e) => setAlphabet(e.target.value.split(','))} label='Alphabet'/>
            <TextField className='machine-param' value={states} onChange={(e) => setStates(e.target.value.split(','))} label='States'/>
            <TextField className='machine-param' value={halting} onChange={(e) => setHalting(e.target.value.split(','))} label='Halting States'/>
            <div className='trans-func'>
                {transition.map((t, index) => 
                    <div key={index} className='trans-field'>
                        <TextField className='machine-param' value={t} onChange={(e) => changeTransition(index, e.target.value)} label={`Transition Function ${index+1}`} />
                    </div>
                )}
                <div className='trans-add'><AiOutlinePlus size={40} onClick={() => setTransition([...transition,""])}/></div>
            </div>
            <div className='form-submit'>
                <button className='button' onClick={onSubmit}>SAVE</button>
            </div>
        </div>
    )
}

export default NewMachine