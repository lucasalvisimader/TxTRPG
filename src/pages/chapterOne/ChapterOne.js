//styles
import './ChapterOne.css';

// react
import { useState } from 'react';

// components
import { DialogText } from '../../components/dialogText/DialogText';

// json
import json from '../../jsons/ChapterOne.json';

export const ChapterOne = () => {
    const [isChoice, setIsChoice] = useState(false);
    const [text, setText] = useState(json.chapter_one.text_0);

    return (<>
        <div className='chapter_one_container'>
            <DialogText isChoice={isChoice} text={text} title={json.chapter_one.title} />
        </div>
    </>);
}