// styles
import './ChoiceButton.css';

// react
import { useEffect, useState } from 'react';

export const ChoiceButton = ({ text }) => {
    const [isFinishedWriting, setIsFinishedWriting] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsFinishedWriting(prev => prev + 1);
        }, 40);
        return () => clearInterval(interval);
    });

    return (
        <div className='choice_button_container'>
            <button className='choice_button_button'>
                {text.substring(0, isFinishedWriting)}
            </button>
        </div>
    );
}