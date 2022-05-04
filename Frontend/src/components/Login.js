import {Link} from 'react-router-dom'
import {useState} from 'react'

const Login = ({ setUser, url }) => {

    const [lUser, setLUser] = useState('')

    const addUser = async (user) => {
        console.log('hello')
        const res = await fetch(`${url}/add_user?user=${user}`, {method : 'POST'})
        setUser(user)
        return res.status === 200 ? res.status : alert('Error')
    }

    return (
    <div className='input-section'>
    <form className='input'>
        <input className='input-tm' type='text' onChange={(e) => setLUser(e.target.value)} placeholder='User Name'/>
        <Link to="/home">
            <button className='button' onClick={() => {
                setUser(lUser)
                // addUser(lUser)
            }}>LOGIN</button>
        </Link>
    </form>
    </div>

    )
}
    
export default Login