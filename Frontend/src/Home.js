import { useState, useEffect } from 'react'
import Button from './components/Button'
import InfoPage from './components/InfoPage';
import NewMachine from './components/NewMachine';
import Machines from './components/Machines';
import Main from './components/Main';
import React from 'react'
import { machineData } from './components/data/defaultMachines'

function Home( { url } ) {

  const [selected, setSelected] = useState('')
  const [showAddMachine, setShowAddMachine] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [showInfo, setShowInfo] = useState(true)
  const [machines, setMachines] = useState(machineData)
  
  useEffect(() => {
    const m = JSON.parse(sessionStorage.getItem('machines'))
    setMachines(m ? m : machines)
  }, []);

  useEffect(() => {
    sessionStorage.setItem('machines', JSON.stringify(machines));
  }, [machines]);

  const deleteMachine = async (machineID) => {
    const remove = window.confirm(`Are you sure you want to delete this machine?`)
    if (remove) {
      const newList = machines.filter((machine) => machine.machineID !== machineID)
      sessionStorage.setItem('machines', JSON.stringify(newList));
      setMachines(newList)
    }
  }

  const addMachine = async (name, alphabet, states, halting, transition) => {

    const newMachine = {"machineID" : name, "states" : states, "halting" : halting, "alphabet" : alphabet, "transition_function" : transition}
    let newList = []

    if (machines.filter(machine => machine.machineID === newMachine.machineID).length) {
      //update machines rather than append
      newList = machines.map(machine => newMachine.machineID === machine.machineID ? newMachine : machine)
    }
    else {
      newList = [...machines, newMachine]
    }
    
    sessionStorage.setItem('machines', JSON.stringify(newList));

    setMachines(newList)
    setShowAddMachine(false)
    setShowEdit(false)
    setShowInfo(false)
    setSelected("")
  }

  const cloneMachine = async (clone) => {

    const newMachine = {"machineID" : clone.machineID + " " + machines.filter(machine => machine.machineID.split(' ').slice(0,2).join() === clone.machineID.split(' ').slice(0,2).join()).length, 
                        "states" : clone.states, 
                        "halting" : clone.halting, 
                        "alphabet" : clone.alphabet, 
                        "transition_function" : clone.transition_function}
    let newList = []

    if (machines.filter(machine => machine.machineID === newMachine.machineID).length) {
      //update machines rather than append
      newList = machines.map(machine => newMachine.machineID === machine.machineID ? newMachine : machine)
    }
    else {
      newList = [...machines, newMachine]
    }
    
    sessionStorage.setItem('machines', JSON.stringify(newList));

    setMachines(newList)
    setShowAddMachine(false)
    setShowInfo(false)
    setShowEdit(false)
    setSelected("")
  }

  const restoreDefault = (selected) => {
    const defaultMachine = machineData.filter(machine => machine.machineID === selected)[0]
    const newList = machines.map(machine => defaultMachine.machineID === machine.machineID ? defaultMachine : machine)

    sessionStorage.setItem('machines', JSON.stringify(newList))

    setMachines(newList)
    setShowAddMachine(false)
    setShowInfo(false)
    setShowEdit(false)
    setSelected("")
  }

  // Get tape log
  const getLog = async (machineID, inputString) => {

    const requestParams = {
      method : 'POST',
      headers: {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({"machine" : machines.filter((machine) => machine.machineID === machineID)[0], "input_string" : inputString})
    };

    const res = await fetch(`${url}/log`, requestParams)
    
    if(res.status === 200) {
      const data = await res.json()
      return data
    }
    else {
      alert('Error')
    }
  }

  const select = (id) => {
    //TODO sort out this mess
    if (selected && showAddMachine && showEdit) {
      if (id === selected ) {
        setShowAddMachine(!showAddMachine)
        setShowEdit(!showEdit)
        setSelected("")
      }
      else {
        setSelected(id)
        setShowAddMachine(false)
        setShowEdit(false)
      }
    }
    else if (selected && showAddMachine) {
      if (id === selected) {
        setShowAddMachine(!showAddMachine)
        setSelected("")
      }
      else {
        setSelected(id)
        setShowAddMachine(false)
      }
    }
    else if (selected && showEdit) {
      if (id === selected) {
        setShowEdit(!showEdit)
        setSelected("")
      }
      else {
        setSelected(id)
        setShowEdit(false)
      }
    }
    else if (selected) {
      id === selected ? setSelected("") : setSelected(id)
    }
    else if (showAddMachine && !selected) {
      setShowAddMachine(false)
      setSelected(id)
    }
    else {
      setSelected(id)
    }
  }

  return (
    <div className="container">
      <Machines machines={machines} deleteMachine={deleteMachine} onClick={select} selected={selected}/>
      <div className='buttons'>
        <Button text={showAddMachine ? 'Hide Configurator' : 'New'} colour={showAddMachine ? "red" : "black"} onClick={() => setShowAddMachine(!showAddMachine)}/>
        { selected && <Button text={showEdit ? 'Hide Configurator' : 'Edit'} colour={showEdit ? "red" : "black"} onClick={() => setShowEdit(!showEdit)}/>}
        { selected && <Button text="Clone Machine" colour="black" onClick={() => cloneMachine(machines.filter((machine) => machine.machineID === selected)[0])}/>}
        { Boolean(machineData.filter(machine => machine.machineID === selected).length) && <Button text="Restore Default" colour="black" onClick={() => restoreDefault(selected)}/>}
        <Button text={showInfo ? 'Hide Info' : 'Info'} colour={showInfo ? "red" : "black"} onClick={() => setShowInfo(!showInfo)}/>
      </div>
      {showAddMachine && <NewMachine addMachine={addMachine} />}
      {showEdit && <NewMachine machine={machines.filter((machine) => machine.machineID === selected)[0]} addMachine={addMachine} /> }
      {showInfo && <InfoPage />}
      {selected && <Main key={selected} machine={machines.filter((machine) => machine.machineID === selected)[0]} getLog={getLog} />}
    </div>
  );
}

export default Home;