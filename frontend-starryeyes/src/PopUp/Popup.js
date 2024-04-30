import React, { useState, useEffect } from 'react';
import '../App.css';
import { Typography, Button, Box } from '@mui/material';
import FormDialog from './FormDialog.js';
import SunsetTerrain from '../Images/Icons/Sonnenuntergang_Gelände.png';
import SunsetHorizon from '../Images/Icons/Sonnenuntergang_Horizont.png';
import SunriseHorizon from '../Images/Icons/Sonnenaufgang_Horizont.png';
import SunriseTerrain from '../Images/Icons/Sonnenaufgang_Gelände.png'
import SunVisibility from '../Images/Icons/Sonne_Auge.png';
import StarVisibility from '../Images/Icons/Stern_Auge.png'
import convertCoordinatesToLV95 from './TransformToLV95.js';

function PopupContent({ clickPosition, showSuccessSnackbar, setShowSuccessSnackbar, sunTimes }) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [lv95Coords, setLv95Coords] = useState(null);

    const handleAbonnierenClick = () => {
        convertCoordinatesToLV95(clickPosition.lng, clickPosition.lat)
            .then(data => {
                console.log('Result:', data);
                setLv95Coords(data);
                setDialogOpen(true); 
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };
    
    return (
        <div>
            <Typography fontWeight= "bold" variant="h6">
                Aktuelle Infos
            </Typography>
                <Box className="IconBox">
                    <img src={SunsetTerrain} alt="SunsetTerrain" title={'Sonnenuntergang Gelände'} style={{ width: '40px', height: '30px' }}/>
                    <div style={{ width: '40px', textAlign: 'right' }}>{sunTimes.sunsetTerrain}</div>
                </Box>
                <Box className="IconBox">
                    <img src={SunsetHorizon} alt="SunsetHorizon" title={'Sonnenuntergang Horizont'} style={{ width: '40px', height: '30px' }}/>
                    <div style={{ width: '40px', textAlign: 'right' }}>{sunTimes.sunsetHorizon}</div>
                </Box>
                <Box className="IconBox">
                    <img src={SunriseHorizon} alt="SunriseHorizon" title={'Sonnenaufgang Horizont'} style={{ width: '40px', height: '30px' }}/>
                    <div style={{ width: '40px', textAlign: 'right' }}>{sunTimes.sunriseHorizon}</div>
                </Box>
                <Box className="IconBox">
                    <img src={SunriseTerrain} alt="SunriseTerrain" title={'Sonnenaufgang Gelände'} style={{ width: '40px', height: '30px' }}/>
                    <div style={{ width: '40px', textAlign: 'right' }}>{sunTimes.sunriseTerrain}</div>
                </Box>
                <Box className="IconBox">
                    <img src={SunVisibility} alt="SunVisibility" title={'Sichtbarkeit Sonne'} style={{ width: '30px', height: '30px', marginLeft: '5px', marginRight: '5px'  }}/>
                    <div style={{ width: '40px', textAlign: 'right' }}>{sunTimes.sunsetCloud} %</div>
                </Box>
                <Box className="IconBox">
                    <img src={StarVisibility} alt="StarVisibility" title={'Sichtbarkeit Sterne'} style={{ width: '30px', height: '30px', marginLeft: '5px', marginRight: '5px'  }}/>
                    <div style={{ width: '40px', textAlign: 'right' }}>100%</div>
                </Box>
            <br/> 
            <Box textAlign={'center'}>
                <Button
                    variant="contained"
                    sx={{
                        color: "white",
                        padding: '4px 10px',
                        borderRadius: '0%',
                        fontSize: '0.7rem',
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