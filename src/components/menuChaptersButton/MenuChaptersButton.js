// css
import './MenuChaptersButton.css';

export const MenuChaptersButton = ({props}) => {
    const { index } = props;

    return (<>
        <div className='menu_chapters_button_container'>
            <div className='menu_chapters_button_text_container'>
                <span className='menu_chapters_button_text'>Chapter {index + 1}</span>
            </div>
        </div>
    </>);
}