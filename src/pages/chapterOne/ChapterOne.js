//styles
import './ChapterOne.css';

// react
import { useEffect, useState } from 'react';

// components
import { Dialog } from '../../components/dialog/Dialog';

// json
import json from '../../jsons/ChapterOne.json';

export const ChapterOne = () => {
    const [title, setTitle] = useState(json.chapter_one.title);
    const [text, setText] = useState("");
    const [choices, setChoices] = useState([]);
    const [whichPartOfChapter, setWhichPartOfChapter] = useState("0");

    const findChoice = (choice) => {
        if (choice[0] === "choice") {
            setChoices((prevState) => {
                const key = choice[1];
                if (!prevState.some(item => item[0] === key)) {
                    return [...prevState, [key, choice[2]]];
                }
                return prevState;
            });
        }
    }

    const setGameText = () => {
        if (json.chapter_one[whichPartOfChapter][0][0] === "text") {
            let completeText = "";

            json.chapter_one[whichPartOfChapter][0].forEach(partText => {
                if (partText !== "text" && partText !== whichPartOfChapter) {
                    if (completeText !== "") {
                        completeText += "<br>";
                    }
                    completeText += partText;
                }
            });

            if (completeText !== "") {
                setText(completeText);
            }
        }
    }

    const setGameChoices = () => {
        setChoices([]);
        let events = localStorage.getItem("events");
        json.chapter_one[whichPartOfChapter].forEach(choice => {
            if (events) {
                String.toString(events);
                let cleanedEvents = events.split(",");
                console.log(cleanedEvents)
                for(let i = 0; i < cleanedEvents.length; i++) {
                        console.log(choice[2])
                        console.log(cleanedEvents[i])
                        console.log(events[i] === choice[2]);
                        console.log(choice[1].includes("Pegar"));
                        console.log(events[i] === choice[2] 
                            // && choice[1].includes("Pegar")
                            )
                        if (cleanedEvents[i] === choice[2] 
                            // && choice[1].includes("Pegar")
                            ) {
                            return;
                        }
                }
            }
            findChoice(choice)
        });
    }

    useEffect(() => {
        setGameChoices();
    }, []);

    useEffect(() => {
        setGameText();
        setGameChoices();
    }, [whichPartOfChapter]);

    return (<>
        <div className='chapter_one_container'>
            <Dialog title={title} text={text} choices={choices}
                whichPartOfChapter={whichPartOfChapter} setWhichPartOfChapter={setWhichPartOfChapter} />
        </div>
    </>);
}