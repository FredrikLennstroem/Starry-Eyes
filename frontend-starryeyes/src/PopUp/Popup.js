import React, { useState, useEffect } from 'react';
import '../App.css';
import { Typography, Button, Box } from '@mui/material';
import FormDialog from './FormDialog.js';
import convertCoordinatesToLV95 from './TransformToLV95.js';
import SunsetTerrain from '../Images/Icons/Sonnenuntergang_Gelände.png';
import SunsetHorizon from '../Images/Icons/Sonnenuntergang_Horizont.png';
import SunriseHorizon from '../Images/Icons/Sonnenaufgang_Horizont.png';
import SunriseTerrain from '../Images/Icons/Sonnenaufgang_Gelände.png'
import SunVisibility from '../Images/Icons/Sonne_Auge.png';
import StarVisibility from '../Images/Icons/Stern_Auge.png'

function PopupContent({ clickPosition, showSuccessSnackbar, setShowSuccessSnackbar }) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [lv95Coords, setLv95Coords] = useState(null);
    const [sunTimes, setSunTimes] = useState({
        sunsetTerrain: 'hh:mm',
        sunsetHorizon: 'hh:mm',
        sunriseHorizon: 'hh:mm',
        sunriseTerrain: 'hh:mm',
        sunsetCloud: '--'
    });

    useEffect(() => {
        const fetchSunTimes = async () => {
            try {
                const response = await fetch ('http://127.0.0.1:8000/sun', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        latitude: clickPosition.lat.toFixed(6),
                        longitude: clickPosition.lng.toFixed(6)
                    })
                });
                if (!response.ok){
                    throw new Error('Network response was not ok')
                }
                const data = await response.json();
                console.log('Response data:', data)
                setSunTimes({
                    sunsetTerrain: data.sunset_dem,
                    sunsetHorizon: data.sunset_globe,
                    sunriseHorizon: data.sunrise_globe,
                    sunriseTerrain: data.sunrise_dem,
                    // sunsetCloud: data.sunset_cloud
                });
            } catch (error) {
                console.log('Error bei Sonnen-API-Abfrage:', error);
            }
        };
        if (clickPosition) {
            fetchSunTimes();
        }
    }, [clickPosition]);

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