// styles
import './ChoiceButton.css';

// react
import { useEffect, useState } from 'react';

export const ChoiceButton = ({ id, text, timeoutTime, whichPartOfChapter, setWhichPartOfChapter }) => {
    const [isFinishedWriting, setIsFinishedWriting] = useState(false);
    const [textAfterTimeout, setTextAfterTimeout] = useState("");

    const handleChoiceButtonClick = () => {
        setWhichPartOfChapter(id)
    }
    
    const timeoutBetweenComponents = () => {
        setTimeout(() => {
            setTextAfterTimeout(text.substring(0, isFinishedWriting));
        }, 1000 * timeoutTime)
    }
    
    useEffect(() => {
        timeoutBetweenComponents();
        const interval = setInterval(() => {
            setIsFinishedWriting(prev => prev + 1);
        }, 40);
        return () => clearInterval(interval);
    });

    return (
        <div className='choice_button_container'>
            <button className='choice_button_button' onClick={handleChoiceButtonClick}>
                {textAfterTimeout}
            </button>
        </div>
    );
}