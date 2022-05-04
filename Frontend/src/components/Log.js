
const Log = ({ l, i, onClick }) => {
  return (
      <div className="log" onClick={() => onClick(i)}>
          <h3>{l[1]}: {l[2]}</h3>
      </div>
  )
}

export default Log