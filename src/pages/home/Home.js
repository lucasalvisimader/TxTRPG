// styles
import './Home.css';

// react
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
    const navigate = useNavigate();
    const [isFadingOut, setIsFadingOut] = useState(false);

    const startGame = () => {
        setIsFadingOut(true);
        setTimeout(() => {
            navigate("/chapter-one");
        }, 2000);
    }

    return (<>
        <div className='home_container'>
            <div className='home_start'>Start
                <button className='home_start_button' onClick={startGame}>Start</button>
            </div>
            {isFadingOut && (
                <div className="home_fade_out" />
            )}
        </div>
    </>);
}