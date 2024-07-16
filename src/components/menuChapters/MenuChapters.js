// css
import { Button } from '@mui/material';
import './MenuChapters.css';

export const MenuChapters = () => {

    return (<>
        <div className='menu_chapters_container'>
            <Button variant="outlined" onClick={handleClickOpen}>
                Open simple dialog
            </Button>
            <SimpleDialog
                selectedValue={selectedValue}
                open={open}
                onClose={handleClose}
            />
        </div>
    </>);
}