
const Button = ({ text, colour, onClick}) => {

    return (
        <button onClick={onClick} style={{ backgroundColor : colour}} className='button'>{text}</button>
    );
};

export default Button;