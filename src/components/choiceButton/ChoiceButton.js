// styles
import './ChoiceButton.css';

// react
import { useEffect, useState } from 'react';

export const ChoiceButton = ({ id, text, timeoutTime, whichPartOfChapter, setWhichPartOfChapter, setIsFinishedWriting }) => {
    const [isFinishedWritingChoice, setIsFinishedWritingChoice] = useState(false);
    const [textAfterTimeout, setTextAfterTimeout] = useState("");

    const handleChoiceButtonClick = () => {
        setWhichPartOfChapter(id)
        setIsFinishedWriting(false);
    }
    
    const timeoutBetweenComponents = () => {
        setTimeout(() => {
            setTextAfterTimeout(text.substring(0, isFinishedWritingChoice));
        }, 1000 * timeoutTime)
    }

    useEffect(() => {
        timeoutBetweenComponents();
        const interval = setInterval(() => {
            setIsFinishedWritingChoice(prev => prev + 1);
        }, 40);
        return () => clearInterval(interval);
    });

    useEffect(() => {
        setIsFinishedWritingChoice(0);
        timeoutBetweenComponents();
        const interval = setInterval(() => {
            setIsFinishedWritingChoice(prev => prev + 1);
        }, 40);
        return () => clearInterval(interval);
    }, [whichPartOfChapter]);

    return (
        <div className='choice_button_container'>
            <button className='choice_button_button' onClick={handleChoiceButtonClick}>
                {textAfterTimeout}
            </button>
        </div>
    );
}