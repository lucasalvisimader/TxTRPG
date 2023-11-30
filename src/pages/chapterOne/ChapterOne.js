//styles
import './ChapterOne.css';

// react
import { useEffect, useState } from 'react';

// components
import { DialogText } from '../../components/dialogText/DialogText';

// json
import json from '../../jsons/ChapterOne.json';

export const ChapterOne = () => {
    const [choices, setChoices] = useState([]);
    const [whichPartOfChapter, setWhichPartOfChapter] = useState(0);
    const [chapter, setChapter] = useState();

    const getChoices = () => {
        json.forEach(choice => {
            console.log(choice)
            if (choice[0] === "choice") {
                setChoices((prevState) => {
                    const key = choice[1];
                    if (!prevState.some(item => item[0] === key)) {
                        return [...prevState, [key, choice[2]]];
                    }
                    return prevState;
                });
            }
        })
    }

    useEffect(() => {
        getChoices();
    }, [])

    useEffect(() => {
        setChapter(json.chapter_one)
        setWhichPartOfChapter("0");
    }, [])

    return (<>
        <div className='chapter_one_container'>
            <DialogText title={json.chapter_one[0][0][1]} text={json.chapter_one[0][1][1]} choices={choices}
                whichPartOfChapter={whichPartOfChapter} setWhichPartOfChapter={setWhichPartOfChapter} />
        </div>
    </>);
}