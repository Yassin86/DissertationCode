import { useState, useEffect } from 'react'

const getWidth = () => {
  return window.innerWidth
}

const Tape = ( { content, head } ) => {
  const [width, setWidth] = useState(getWidth())

  useEffect(() => {
    function handleResize() {
      setWidth(getWidth());
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  head = parseInt(head)
  const n = Math.floor(width*0.85 / 98)
  const h = Math.floor(n/2)

  if (content.length > n) {

    let m = 1
    if (n % 2 === 0) m = 0

    if (head + h >= content.length) {
      head = h - content.length + head + h + m
      content = content.slice(-n)
    }
    else if (head - h < 0) {
      content = content.slice(0, n)
    }
    else {
      content = content.slice(head - h, head + h + m)
      head = h
    }
  }
  
  return (
    <div className='tape'>
      <h3>{content.map((letter, index) => <span className={head === index ? 'head' : 'letter'} key={index}>{letter}</span>)}</h3>
    </div>
  )
}

export default Tape