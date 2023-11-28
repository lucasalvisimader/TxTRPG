// styles
import './DialogText.css';

export const DialogText = ({ isChoice, text, title }) => {

    return (<>
        <div className='dialog_text_container'>
            <div className='dialog_text_title_container'>
                {title}
            </div>
            <div className='dialog_text_text_container'>
                {!(isChoice) && (<>
                    {text}
                </>) || (<>
                    
                </>)}
            </div>
        </div>
    </>);
}