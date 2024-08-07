// styles
import './Dialog.css';

// react
import { useEffect, useRef, useState } from 'react';

// components
import { Choices } from '../choices/Choices';
import { Animations } from '../../util/animations/Animations';

export const Dialog = ({ title, text, choices, isDeathScreen, whichPartOfChapter, setWhichPartOfChapter }) => {
    const [isWaitingToFinishWriting, setIsWaitingToFinishWriting] = useState(false);
    const [isFinishedWriting, setIsFinishedWriting] = useState(false);
    const dialogTextRef = useRef(null);
    let animationInterval;
    let blinkTimeout;

    const initializeDialogText = async (ref, jsonText, withUnderline, speed) => {
        clearInterval(animationInterval);
        // const sentenceElement = document.querySelector(documentClass);
        let offset = 0;

        if (speed === 0) {
            ref.current.innerHTML = jsonText;
            if (withUnderline) {
                ref.innerHTML += "_";
            }
            setIsFinishedWriting(true);
            return;
        }

        const updateSentence = () => {
            let finalText = ">  ";
            finalText += jsonText.substring(0, offset);
            if (withUnderline) {
                finalText = finalText + "_";
            }
            ref.current.innerHTML = finalText;
        }

        const handleAnimation = () => {
            if (!(offset >= (jsonText.length + 3))) {
                offset++;
                updateSentence();
            } else if (!(isFinishedWriting)) {
                setIsFinishedWriting(true);
                clearInterval(animationInterval);
            }
        }
        animationInterval = setInterval(handleAnimation, speed);

        return new Promise(resolve => {
            const checkIfFinished = () => {
                if (offset >= (jsonText.length + 3)) {
                    clearInterval(animationInterval);
                    resolve();
                }
            }
            animationInterval = setInterval(() => {
                handleAnimation();
                checkIfFinished();
            }, speed);
        });
    }

    useEffect(() => {
        const fetchData = async () => {
            setIsFinishedWriting(false);
            const textContainerHtml = dialogTextRef.current.innerHTML;
            if (textContainerHtml !== text) {
                dialogTextRef.current.innerHTML = "";
                await initializeDialogText(dialogTextRef, text, false, 70);
            }
        }
        fetchData();
    }, [text]);

    useEffect(() => {
        if (isFinishedWriting) {
            Animations.blinkUnderlineEffectText('.dialog_text_text_container', isWaitingToFinishWriting, setIsWaitingToFinishWriting, blinkTimeout);
        }
    }, [isFinishedWriting, isWaitingToFinishWriting, text]);

    useEffect(() => {
        return () => {
            clearInterval(animationInterval);
            clearTimeout(blinkTimeout);
        };
    }, []);

    return (
        <div className={`dialog_text_container`}>
            <div className='dialog_text_title_container'>
                {title}
            </div>
            <div className='dialog_text_content'>
                <div className='dialog_text_text_container' ref={dialogTextRef}/>
                <div className='dialog_text_choices_container'>
                    {(isFinishedWriting &&
                        (dialogTextRef.current.innerHTML === ("&gt;  " + text) ||
                            dialogTextRef.current.innerHTML === ("&gt;  " + text + "_"))) &&
                        choices.map((choice, index) => (
                            <Choices key={index} id={choice[1]} text={choice[0]} timeoutTime={index}
                                whichPartOfChapter={whichPartOfChapter} setWhichPartOfChapter={setWhichPartOfChapter}
                                isFinishedWriting={isFinishedWriting} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
}
