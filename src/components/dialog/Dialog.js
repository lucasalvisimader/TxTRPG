// styles
import './Dialog.css';

// react
import { useEffect, useState } from 'react';

// components
import { ChoiceButton } from '../choiceButton/ChoiceButton';

// json
import deathJson from '../../jsons/DeathText.json';

export const Dialog = ({ title, text, choices, isDeathScreen, whichPartOfChapter, setWhichPartOfChapter }) => {
    const [isWaitingToFinishWriting, setIsWaitingToFinishWriting] = useState(false);
    const [isFinishedWriting, setIsFinishedWriting] = useState(false);
    const [lighthouseEffectClass, setLighthouseEffectClass] = useState('');
    let animationInterval;
    let blinkTimeout;

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const initializeDialogText = async (documentClass, jsonText, withUnderline, speed, typeScreen) => {
        clearInterval(animationInterval);
        const sentenceElement = document.querySelector(documentClass);
        let offset = 0;

        if (isDeathScreen) {
            switch(typeScreen) {
                case 0: setLighthouseEffectClass('lighthouse_effect_slow'); break;
                case 1: setLighthouseEffectClass('lighthouse_effect_normal'); break;
                case 2: setLighthouseEffectClass('lighthouse_effect_fast'); break;
                case 3: setLighthouseEffectClass('lighthouse_effect_faster'); break;
                default: setLighthouseEffectClass('');
            }
        } else {
            setLighthouseEffectClass('');
        }

        if (speed === 0) {
            sentenceElement.innerHTML = jsonText;
            if (withUnderline) {
                sentenceElement.innerHTML += "_";
            }
            setIsFinishedWriting(true);
            return;
        }

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
                clearInterval(animationInterval);
            }
        }
        animationInterval = setInterval(handleAnimation, speed);

        return new Promise(resolve => {
            const checkIfFinished = () => {
                if (offset >= jsonText.length) {
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
        const fetchData = async () => {
            setIsFinishedWriting(false);
            const textContainerHtml = document.querySelector('.dialog_text_text_container').innerHTML;
            if (textContainerHtml !== text) {
                document.querySelector('.dialog_text_text_container').innerHTML = "";
                if (isDeathScreen) {
                    await initializeDialogText('.dialog_text_text_container', text, false, 70, 0);
                    let deathText = "";
                    let waitingDotsText = "";
                    let restartText = "";
                    deathJson.fastDeath.forEach(lineText => {
                        if (deathText !== "") {
                            deathText += "<br>";
                        }
                        deathText += lineText;
                    });
                    deathJson.waitingDots.forEach(lineText => {
                        if (waitingDotsText !== "") {
                            waitingDotsText += "<br>";
                        }
                        waitingDotsText += lineText;
                    });
                    deathJson.restart.forEach(lineText => {
                        if (restartText !== "") {
                            restartText += "<br>";
                        }
                        restartText += lineText;
                    });
                    await delay(3000);
                    await initializeDialogText('.dialog_text_text_container', deathText, false, 70, 1);
                    await delay(3000);
                    await initializeDialogText('.dialog_text_text_container', waitingDotsText, false, 300, 2);
                    await delay(1000);
                    await initializeDialogText('.dialog_text_text_container', restartText, false, 70, 3);
                } else {
                    await initializeDialogText('.dialog_text_text_container', text, false, 70);
                }
            }
        }
        fetchData();
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

    return (
        <div className={`dialog_text_container ${lighthouseEffectClass}`}>
            <div className='dialog_text_title_container'>
                {title}
            </div>
            <div className='dialog_text_content'>
                <div className='dialog_text_text_container' />
                <div className='dialog_text_choices_container'>
                    {(isFinishedWriting &&
                        (document.querySelector('.dialog_text_text_container').innerHTML === text ||
                            document.querySelector('.dialog_text_text_container').innerHTML === text + "_")) &&
                        choices.map((choice, index) => (
                            <ChoiceButton key={index} id={choice[1]} text={choice[0]} timeoutTime={index}
                                whichPartOfChapter={whichPartOfChapter} setWhichPartOfChapter={setWhichPartOfChapter}
                                isFinishedWriting={isFinishedWriting} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
}
