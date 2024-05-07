import {React, useState} from 'react';
import './App.css';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import CheckBox from '@mui/material/Checkbox';

function InfoBox({setInfoClose}) {
    const [checkboxCheck, setCheckboxCheck] = useState(false);
    const [open, setOpen] = useState(true);

    const handleClose = () => {
        setInfoClose(false);
        if (checkboxCheck) {
            localStorage.setItem('hideInfo', 'false');
        } else {
            localStorage.setItem('hideInfo', 'true');
        }
        console.log(localStorage.getItem('hideInfo'))
    };

    const handleCheckboxChange = (event) => {
        setCheckboxCheck(event.target.checked);
    };       

    return (
        <Dialog open={open} onClose={handleClose} PaperProps={{style: {borderRadius: '0px'},component: 'form'}}>
            <DialogTitle>
                Willkommen bei StarryEyes
            </DialogTitle>
            <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
            }}
            >
                <CloseIcon/>
            </IconButton>
            <DialogContent>
                <Typography >
                    Infotext zur App. Dieser wird beim Öffnen angezeigt. Bestätigen der Checkbox speichert den Entscheid, diesen Hinweis nicht mehr anzuzeigen.
                </Typography>
                <CheckBox className='Checkbox' onChange={handleCheckboxChange}>
                    Diesen Hinweis zukünftig nicht mehr anzeigen
                </CheckBox>
                <Button
                    type="submit"
                    variant="contained"
                    onClick={handleClose}
                    sx={{
                    color: "white",
                    padding: '4px 10px',
                    fontSize: '0.8rem',
                    borderRadius: "0%",
                    backgroundColor: "#334854",
                    '&:hover': {
                        backgroundColor: "#667784"
                        }
                    }}
                    >Schliessen
                </Button>
            </DialogContent>
        </Dialog>
    );
}

export default InfoBox;