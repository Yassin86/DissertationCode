import Home from './Home'
import Header from './components/Header'

const App = () => {

    const domain = window.location.hostname;
    const url = domain === "localhost" ? "http://localhost:8000" : "https://turing-machine-api.herokuapp.com"

    return (
    <div className='content'>
        <Header />
        <Home url={url} />
    </div>
    )
}

export default App