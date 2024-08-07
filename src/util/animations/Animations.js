// src/util/animations/Animations.js

export class Animations {
    static blinkUnderlineEffectText(textSelector, isWaitingToFinishWriting, setIsWaitingToFinishWriting, blinkTimeout) {
        if (!isWaitingToFinishWriting) {
            const sentenceElement = document.querySelector(textSelector);
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
}
