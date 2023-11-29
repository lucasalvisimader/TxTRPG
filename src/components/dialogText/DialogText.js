// styles
import './DialogText.css';

// react
import { useEffect, useState } from 'react';

export const DialogText = ({ isChoice, text, title }) => {
    const [isWaitingToFinishWriting, setIsWaitingToFinishWriting] = useState(false);
    const [isFinishedWriting, setIsFinishedWriting] = useState(false);
    let animationInterval;
    let blinkTimeout;

    const initializeDialogText = () => {
        clearInterval(animationInterval);

        const sentenceElement = document.querySelector('.dialog_text_text_container');
        let offset = 0;
        const speed = 10;

        const updateSentence = () => {
            const finalText = text.substring(0, offset) + "_";
            sentenceElement.innerHTML = finalText;
        }

        const handleAnimation = () => {
            if (!(offset >= text.length)) {
                offset++;
                updateSentence();
            } else if (!(isFinishedWriting)) {
                setIsFinishedWriting(true);
            }
        }
        animationInterval = setInterval(handleAnimation, speed);
    }


    const blinkUnderlineEffectText = () => {
        const sentenceElement = document.querySelector('.dialog_text_text_container');
        if (!(isWaitingToFinishWriting)) {
            clearTimeout(blinkTimeout);
            setIsWaitingToFinishWriting(true);

            const lastChar = sentenceElement.innerHTML.charAt(sentenceElement.innerHTML.length - 1);
            if (lastChar === "_") {
                sentenceElement.innerHTML = sentenceElement.innerHTML.slice(0, - 1);
            } else {
                sentenceElement.innerHTML += "_";
            }
            blinkTimeout = setTimeout(() => {
                setIsWaitingToFinishWriting(false)
            }, 750);
        }
    }

    useEffect(() => {
        initializeDialogText();
    }, [])

    useEffect(() => {
        if (isFinishedWriting) {
            blinkUnderlineEffectText();
        }
    }, [isFinishedWriting, isWaitingToFinishWriting])


    return (<>
        <div className='dialog_text_container'>
            <div className='dialog_text_title_container'>
                {title}
            </div>
            <div className='dialog_text_text_container'>
                {(isChoice && (<>
                </>))}
            </div>
        </div>
    </>);
}