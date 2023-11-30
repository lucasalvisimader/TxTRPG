// styles
import { ChoiceButton } from '../choiceButton/ChoiceButton';
import './DialogText.css';

// react
import { useEffect, useState } from 'react';

export const DialogText = ({ title, text, choices }) => {
    const [isWaitingToFinishWriting, setIsWaitingToFinishWriting] = useState(false);
    const [isFinishedWriting, setIsFinishedWriting] = useState(false);
    let animationInterval;
    let blinkTimeout;

    const initializeDialogText = (documentClass, jsonText, withUnderline, speed) => {
        clearInterval(animationInterval);

        const sentenceElement = document.querySelector(documentClass);
        let offset = 0;

        const updateSentence = () => {
            let finalText = jsonText.substring(0, offset);
            if (withUnderline) {
                finalText = finalText + "_";
            }
            sentenceElement.innerHTML = finalText;
        }

        const handleAnimation = () => {
            if (!(offset >= jsonText.length)) {
                offset++;
                updateSentence();
            } else if (!(isFinishedWriting)) {
                setIsFinishedWriting(true);
            }
        }
        animationInterval = setInterval(handleAnimation, speed);
    }


    const blinkUnderlineEffectText = (documentText) => {
        const sentenceElement = document.querySelector(documentText);
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
        initializeDialogText('.dialog_text_text_container', text, true, 2);
    }, [])

    useEffect(() => {
        if (isFinishedWriting) {
            blinkUnderlineEffectText('.dialog_text_text_container');
        }
    }, [isFinishedWriting, isWaitingToFinishWriting])

    return (<>
        <div className='dialog_text_container'>
            <div className='dialog_text_title_container'>
                {title}
            </div>
            <div className='dialog_text_content'>
                <div className='dialog_text_text_container' />
                <div className='dialog_text_choices_container'>
                    {isFinishedWriting &&
                        choices.map((choice, index) => {
                            return (<ChoiceButton key={index} id={index} text={choice[0]}
                                initializeDialogText={initializeDialogText} />);
                        })
                    }
                </div>
            </div>
        </div>
    </>);
}