import { FaTimes } from 'react-icons/fa'

const Machine = ({ machine, deleteMachine, onClick, selected }) => {
  return (
      <div className="machine" onClick={() => onClick(machine.machineID)} style={{background : selected === machine.machineID ? "lightblue" : "#f4f4f4"}}>
        <h3>
            {machine.machineID}
            <FaTimes
                className='delete'
                style={{ color: 'red', cursor: 'pointer' }}
                onClick={() => deleteMachine(machine.machineID)}
            />
        </h3>
      </div>
  )
}

export default Machine;