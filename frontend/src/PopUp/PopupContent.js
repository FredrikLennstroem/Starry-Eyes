// Dieser Code beinhaltet den ganzen Inhalt des Popups eines gewählten Standorts
// Dieser Code wird in map.js importiert

import React, { useState } from 'react';
import '../App.css';
import FormDialog from './FormDialog.js';
import convertCoordinatesToLV95 from './TransformToLV95.js';
import { Typography, Button, Box, CircularProgress } from '@mui/material';
import SunsetTerrain from '../Images/Icons/Sonnenuntergang_Gelände.png';
import SunsetHorizon from '../Images/Icons/Sonnenuntergang_Horizont.png';
import SunriseHorizon from '../Images/Icons/Sonnenaufgang_Horizont.png';
import SunriseTerrain from '../Images/Icons/Sonnenaufgang_Gelände.png'
import SunVisibility from '../Images/Icons/Sonne_Auge.png';
import StarVisibility from '../Images/Icons/Stern_Auge.png'

function PopupContent({ clickPosition, setShowSuccessSnackbar, sunTimes }) {
    const [dialogOpen, setDialogOpen] = useState(false); // Anzeigevariable des Überwachungs Dialogfensters
    const [lv95Coords, setLv95Coords] = useState(null); // Variable der LV95 Standortkoordinaten (analog zu clickPosition)

    const handleAbonnierenClick = () => {
        convertCoordinatesToLV95(clickPosition.lng, clickPosition.lat)
            .then(data => {
                setLv95Coords(data);
                setDialogOpen(true); 
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }; // Funktion wird ausgeführt beim drücken des 'Standort überwachen' Buttons
    
    return (
        <div>
            <Typography fontWeight= "bold" variant="h6">
                Standortinfos
            </Typography>
                <Box className="IconBox">
                    <img src={SunsetTerrain} alt="SunsetTerrain" title={'Sonnenuntergang Gelände'} style={{ width: '40px', height: '30px' }}/>
                    {sunTimes.sunsetTerrain === "hh:mm" ? ( // Falls der Defaultwert angezeigt werden würde, wird ein Ladekreis angezeigt (bis Daten geladen sind)
                        <CircularProgress size= '25px' sx={{color:"#334854"}}/>
                    ) : (
                        <div style={{ width: '40px', textAlign: 'right' }}>{sunTimes.sunsetTerrain}</div> 
                    )}
                </Box>
                <Box className="IconBox">
                    <img src={SunsetHorizon} alt="SunsetHorizon" title={'Sonnenuntergang Horizont'} style={{ width: '40px', height: '30px' }}/>
                    {sunTimes.sunsetHorizon === "hh:mm" ? ( // Falls der Defaultwert angezeigt werden würde, wird ein Ladekreis angezeigt (bis Daten geladen sind)
                        <CircularProgress size= '25px' sx={{color:"#334854"}}/>
                    ) : (
                        <div style={{ width: '40px', textAlign: 'right' }}>{sunTimes.sunsetHorizon}</div>
                    )}
                </Box>
                <Box className="IconBox">
                    <img src={SunriseHorizon} alt="SunriseHorizon" title={'Sonnenaufgang Horizont'} style={{ width: '40px', height: '30px' }}/>
                    {sunTimes.sunriseHorizon === "hh:mm" ? ( // Falls der Defaultwert angezeigt werden würde, wird ein Ladekreis angezeigt (bis Daten geladen sind)
                        <CircularProgress size= '25px' sx={{color:"#334854"}}/>
                    ) : (
                        <div style={{ width: '40px', textAlign: 'right' }}>{sunTimes.sunriseHorizon}</div>
                    )}
                </Box>
                <Box className="IconBox">
                    <img src={SunriseTerrain} alt="SunriseTerrain" title={'Sonnenaufgang Gelände'} style={{ width: '40px', height: '30px' }}/>
                    {sunTimes.sunriseTerrain === "hh:mm" ? ( // Falls der Defaultwert angezeigt werden würde, wird ein Ladekreis angezeigt (bis Daten geladen sind)
                        <CircularProgress size= '25px' sx={{color:"#334854"}}/>
                    ) : (
                        <div style={{ width: '40px', textAlign: 'right' }}>{sunTimes.sunriseTerrain}</div>
                    )}
                </Box>
                <Box className="IconBox">
                    <img src={SunVisibility} alt="SunVisibility" title={'Sichtbarkeit Sonne'} style={{ width: '30px', height: '30px', marginLeft: '5px', marginRight: '5px'  }}/>
                    {sunTimes.sunsetCloud === "--" ? ( // Falls der Defaultwert angezeigt werden würde, wird ein Ladekreis angezeigt (bis Daten geladen sind)
                        <CircularProgress size= '25px' sx={{color:"#334854"}}/>
                    ) : (
                        <div style={{ width: '40px', textAlign: 'right' }}>{sunTimes.sunsetCloud}%</div>
                    )}
                </Box>
                <Box className="IconBox">
                    <img src={StarVisibility} alt="StarVisibility" title={'Sichtbarkeit Sterne'} style={{ width: '30px', height: '30px', marginLeft: '5px', marginRight: '5px'  }}/>
                    {sunTimes.starCloud === "--" ? ( // Falls der Defaultwert angezeigt werden würde, wird ein Ladekreis angezeigt (bis Daten geladen sind)
                        <CircularProgress size= '25px' sx={{color:"#334854"}}/>
                    ) : (
                        <div style={{ width: '40px', textAlign: 'right' }}>{sunTimes.starCloud}%</div>
                    )}
                </Box>
            <br/> 
            <Box textAlign={'center'}>
                <Button
                    variant="contained"
                    sx={{
                        color: "white",
                        padding: '4px 10px',
                        borderRadius: '0%',
                        fontSize: '0.8rem',
                        backgroundColor: "#334854",
                        '&:hover': {
                            backgroundColor: "#667784"
                        }

                    }}
                    onClick={handleAbonnierenClick}
                >
                    Ort überwachen
                </Button>
            </Box>
            <FormDialog
                open={dialogOpen}
                handleClose={() => setDialogOpen(false)}
                clickPosition={clickPosition}
                lv95Coords={lv95Coords}
                setShowSuccessSnackbar={setShowSuccessSnackbar}
            />
        </div>
    );
}

export default PopupContent;