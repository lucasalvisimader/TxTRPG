// css
import './Dialog.css';
// react
import { useEffect, useRef, useState } from 'react';
// components
import { Choices } from '../choices/Choices';
// utils
import { Animations } from '../../util/animations/Animations';

export const Dialog = ({ title, text, choices, isDeathScreen, whichPartOfChapter, setWhichPartOfChapter }) => {
    const [isWaitingToFinishWriting, setIsWaitingToFinishWriting] = useState(false);
    const [isFinishedWriting, setIsFinishedWriting] = useState(false);
    const [isFinishedWritingChoice, setIsFinishedWritingChoice] = useState(false);
    const [selectedChoiceIndex, setSelectedChoiceIndex] = useState(0);
    const dialogTextRef = useRef(null);
    let animationInterval;
    let blinkTimeout;

    console.log("0: ", choices)
    if (choices) {
        if (choices[selectedChoiceIndex]) {
            console.log("1: ", choices[selectedChoiceIndex][1])
        }
        if (choices[2]) {
            console.log("2: ", choices[2][1])
        }
    }

    const initializeDialogText = async (ref, jsonText, withUnderline, speed) => {
        clearInterval(animationInterval);
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

    // Resetar `selectedChoiceIndex` ao mudar de capítulo
    useEffect(() => {
        // Reseta o índice para a primeira escolha sempre que a parte do capítulo muda
        setSelectedChoiceIndex(0);
    }, [whichPartOfChapter]);

    // Lidar com eventos de teclado globalmente para navegação
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (!isFinishedWriting || isFinishedWritingChoice !== 0) return;

            if (event.key === 'ArrowUp') {
                setSelectedChoiceIndex(prev => (prev - 1 + choices.length) % choices.length);
            } else if (event.key === 'ArrowDown') {
                setSelectedChoiceIndex(prev => (prev + 1) % choices.length);
            } else if (event.key === 'Enter') {
                setWhichPartOfChapter(choices[selectedChoiceIndex][1]);
            }
        }

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isFinishedWriting, selectedChoiceIndex, choices, setWhichPartOfChapter]);

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
                        choices && choices.length > 0 && choices.map((choice, index) => (
                            <Choices key={index} id={choice[1]} text={choice[0]} timeoutTime={index}
                                selectedChoiceIndex={selectedChoiceIndex} setSelectedChoiceIndex={setSelectedChoiceIndex}
                                whichPartOfChapter={whichPartOfChapter} setWhichPartOfChapter={setWhichPartOfChapter}
                                isFinishedWriting={isFinishedWriting} isFinishedWritingChoice={isFinishedWritingChoice} 
                                setIsFinishedWritingChoice={setIsFinishedWritingChoice} index={index} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
}