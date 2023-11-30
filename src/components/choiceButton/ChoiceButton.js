// styles
import './ChoiceButton.css';

// react
import { useEffect, useState } from 'react';

export const ChoiceButton = ({ text, id }) => {
    const [isFinishedWriting, setIsFinishedWriting] = useState(false);
    const [textAfterTimeout, setTextAfterTimeout] = useState("");

    useEffect(() => {
        timeout();
        const interval = setInterval(() => {
            setIsFinishedWriting(prev => prev + 1);
        }, 40);
        return () => clearInterval(interval);
    });

    const timeout = () => {
        setTimeout(() => {
            setTextAfterTimeout(text.substring(0, isFinishedWriting));
        }, 1000 * id)
    }

    return (
        <div className='choice_button_container'>
            <button className='choice_button_button'>
                {textAfterTimeout}
            </button>
        </div>
    );
}