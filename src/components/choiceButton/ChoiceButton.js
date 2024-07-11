// styles
import './ChoiceButton.css';

// react
import { useEffect, useState } from 'react';

export const ChoiceButton = ({ id, text, timeoutTime, whichPartOfChapter, setWhichPartOfChapter, isFinishedWriting }) => {
    const [isFinishedWritingChoice, setIsFinishedWritingChoice] = useState(0);
    const [textAfterTimeout, setTextAfterTimeout] = useState("");

    const handleChoiceButtonClick = () => {
        setWhichPartOfChapter(id)
        if (localStorage.getItem("events")) {
            let eventsBefore = Array.of(localStorage.getItem("events"));
            let eventsAfter = [];
            for (let i = 0; i < eventsBefore.length; i++) {
                eventsAfter.push(eventsBefore[i]);
                if (i === eventsBefore.length - 1) {
                    eventsAfter.push(id);
                }
            }
            localStorage.setItem("events", eventsAfter)
        } else {
            localStorage.setItem("events", [id])
        }
    }

    const timeoutBetweenComponents = () => {
        setTimeout(() => {
            setTextAfterTimeout(text.substring(0, isFinishedWritingChoice));
        }, 1000 * timeoutTime)
    }

    useEffect(() => {
        if (isFinishedWriting) {
            timeoutBetweenComponents();
            const interval = setInterval(() => {
                setIsFinishedWritingChoice(prev => prev + 1);
            }, 40);
            return () => clearInterval(interval);
        }
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