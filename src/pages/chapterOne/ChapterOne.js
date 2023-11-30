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
        json.chapter_one[whichPartOfChapter].forEach(choice => {
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