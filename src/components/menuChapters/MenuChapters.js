// css
import './MenuChapters.css';

// components
import {MenuChaptersButton} from '../menuChaptersButton/MenuChaptersButton';

// external
import Cookies from 'cookies-js';;

export const MenuChapters = () => {
    const whichChapter = Cookies.get('whichChapter');
    // Array.from({length:parseInt(whichChapter)}, (_, index) => console.log(index + 1))

    return (<>
        <div className='menu_chapters_container menu_chapters_conatiner_appear_animation'>
            <div className='menu_chapters_buttons'>
                {Array.from({length:parseInt(whichChapter)}, (_, index) => <MenuChaptersButton props={{index}} key={index} />)}
            </div>
        </div>
    </>);
}