// styles
import './Home.css';

// react
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// components
import { MenuChapters } from '../../components/menuChapters/MenuChapters';

// external
import Cookies from 'cookies-js';

export const Home = () => {
    const navigate = useNavigate();
    const [isFadingOut, setIsFadingOut] = useState(false);
    const whichChapter = Cookies.get('whichChapter');
    const isFirstChapterFinished = !isNaN(whichChapter) && parseInt(whichChapter) >= 2;
    const [isMenuChaptersVisible, setIsMenuChaptersVisible] = useState(false);

    const startGameDefault = () => {
        setIsFadingOut(true);
        setTimeout(() => {
            navigate("/chapter-one-welcome-to-home");
        }, 2000);
    }

    return (<>
        <div className='home_container'>
            {!isFirstChapterFinished && (
                <div className='home_start'>Start
                    <button className='home_button' onClick={startGameDefault}>Start</button>
                </div>
            )}
            {isFirstChapterFinished && (
                <div className='home_start'>Continue
                    <button className='home_button' onClick={() => setIsMenuChaptersVisible(!isMenuChaptersVisible)}>Continue</button>
                </div>
            )}
            {isMenuChaptersVisible && (
                <MenuChapters />
            )}
            {isFadingOut && (
                <div className="home_fade_out" />
            )}
        </div>
    </>);
}