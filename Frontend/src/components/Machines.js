import Machine from "./Machine";

const Machines = ({ machines, deleteMachine, onClick, selected }) => {
  return (
    <div className='machines'>
        {
            machines.length > 0 ? machines.map((tm, index) => (
                <Machine key={index} machine={tm} deleteMachine={deleteMachine} onClick={onClick} selected={selected}/>
            )) :
            <p className='no-tm'>Press 'New' to add machines!</p> 
        }
    </div>
  )
}

export default Machines;
