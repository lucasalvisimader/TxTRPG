// styles
import './Dialog.css';

// components
import { ChoiceButton } from '../choiceButton/ChoiceButton';

// react
import { useEffect, useState } from 'react';

export const Dialog = ({ title, text, choices, whichPartOfChapter, setWhichPartOfChapter }) => {
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
        if (!(isWaitingToFinishWriting)) {
            const sentenceElement = document.querySelector(documentText);
            clearTimeout(blinkTimeout);
            setIsWaitingToFinishWriting((prev) => !prev);

            const lastChar = sentenceElement.innerHTML.charAt(sentenceElement.innerHTML.length - 1);
            if (lastChar === "_") {
                sentenceElement.innerHTML = sentenceElement.innerHTML.slice(0, - 1);
            } else {
                sentenceElement.innerHTML += "_";
            }
            blinkTimeout = setTimeout(() => {
                setIsWaitingToFinishWriting((prev) => !prev);
            }, 750);
        }
    }

    useEffect(() => {
        setIsFinishedWriting(false);
        const textContainerHtml = document.querySelector('.dialog_text_text_container').innerHTML;
        if (textContainerHtml !== text) {
            document.querySelector('.dialog_text_text_container').innerHTML = "";
            initializeDialogText('.dialog_text_text_container', text, true, 10);
        }
    }, [text]);

    useEffect(() => {
        if (isFinishedWriting) {
            blinkUnderlineEffectText('.dialog_text_text_container');
        }
    }, [isFinishedWriting, isWaitingToFinishWriting, text]);

    useEffect(() => {
        return () => {
            clearInterval(animationInterval);
            clearTimeout(blinkTimeout);
        };
    }, []);

    return (<>
        <div className='dialog_text_container'>
            <div className='dialog_text_title_container'>
                {title}
            </div>
            <div className='dialog_text_content'>
                <div className='dialog_text_text_container' />
                <div className='dialog_text_choices_container'>
                    {(isFinishedWriting &&
                        (document.querySelector('.dialog_text_text_container').innerHTML === text ||
                            document.querySelector('.dialog_text_text_container').innerHTML === text + "_")) &&
                        choices.map((choice, index) => {
                            return (<ChoiceButton key={index} id={choice[1]} text={choice[0]} timeoutTime={index}
                                whichPartOfChapter={whichPartOfChapter} setWhichPartOfChapter={setWhichPartOfChapter}
                                isFinishedWriting={isFinishedWriting} />);
                        })
                    }
                </div>
            </div>
        </div>
    </>);
}