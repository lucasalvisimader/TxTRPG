// styles
import { useEffect, useState } from 'react';
import './DialogText.css';

export const DialogText = ({ isChoice, text, title }) => {
    const [innerHtmlTextCounter, setInnerHtmlTextCounter] = useState(0);
    const [isWaitingToFinishWriting, setIsWaitingToFinishWriting] = useState(false);
    let animationInterval;
    let blinkTimeout;

    const initializeDialogText = () => {
        const sentenceElement = document.querySelector('.dialog_text_text_container');
        let offset = 0;
        const speed = 10;

        const updateSentence = () => {
            const finalText = text.substring(0, offset) + "_";
            sentenceElement.innerHTML = finalText;
        }

        const handleAnimation = () => {
            if (!(innerHtmlTextCounter >= text.length)) {
                console.log("socorro2")
                offset++;
                setInnerHtmlTextCounter(offset)
                updateSentence();
            }
        }
        animationInterval = setInterval(handleAnimation, speed); // fazer só uma vez, acho que está fazendo várias
    }

    const blinkUnderlineEffectText = () => {
        const sentenceElement = document.querySelector('.dialog_text_text_container');
        if (!(isWaitingToFinishWriting)) {
            console.log("socorro")
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
            }, 2000);
        }
    }

    useEffect(() => {
        clearInterval(animationInterval);
        if (!(innerHtmlTextCounter >= text.length)) {
            initializeDialogText();
        }
    }, [])

    useEffect(() => {
        if (innerHtmlTextCounter >= text.length) {
            blinkUnderlineEffectText();
        }
    }, [innerHtmlTextCounter])


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