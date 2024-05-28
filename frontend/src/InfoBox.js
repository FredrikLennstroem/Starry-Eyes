// Die InfoBox wird beim ersten Laden der App angezeigt
// Dieser Code wir in map.js importiert

import {React, useState} from 'react';
import './App.css';
import {Button, Dialog, DialogTitle, DialogContent, DialogContentText, IconButton, Typography, Checkbox} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function InfoBox({setInfoClose}) {
    const [checkboxCheck, setCheckboxCheck] = useState(false); // Checkbox Statusvariable

    const handleClose = () => {
        setInfoClose(false);
        if (checkboxCheck) {
            localStorage.setItem('hideInfo', 'false');
        } else {
            localStorage.setItem('hideInfo', 'true');
        }
    }; // Funktion wird beim Schliessen der InfoBox ausgeführt, prüft den Status der Checkbox und ändert je nach Status die localStorage Variable

    const handleCheckboxChange = (event) => {
        setCheckboxCheck(event.target.checked);
    }; // Funktion zur Änderung der Checkbox Statusvariable

    return (
        <Dialog open={true} onClose={handleClose} PaperProps={{style: {borderRadius: '0px'}, component: 'form'}}>
            <DialogTitle style={{paddingBottom: 0}}>
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
                <Typography style={{ lineHeight: '1.4', paddingBottom: 10}}>
                Positionieren Sie den Marker auf der interaktiven Karte und klicken Sie darauf, um aktuelle Informationen zum Sonnenaufgang und -untergang sowie der Sichtbarkeit der Sterne in der Nacht zu erhalten.<br/>
                Nutzen Sie die Möglichkeit, weitere Informationen und stündliche Updates während der Nacht per Mail von uns zu erhalten.<br style={{ marginBottom: '10px' }}/>
                Auf unserer Seite finden sie noch weitere Informationen zur Lichtverschmutzung, dem Schattenwurf und der aktuellen Mondphase - am rechten Rand und im Layermenü oben links.
                </Typography>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Checkbox className='Checkbox' onChange={handleCheckboxChange}/>
                        <DialogContentText style={{paddingRight: '2px'}}>Hinweis nicht mehr anzeigen</DialogContentText>
                    </div>
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
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default InfoBox;