import React, { useState } from 'react';
import { Typography, Button, Box } from '@mui/material';
import StarIcon from '@mui/icons-material/AutoAwesomeOutlined';
import SunIcon from '@mui/icons-material/WbSunnyOutlined';
import EyeIcon from '@mui/icons-material/VisibilityOutlined';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownwardOutlined';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpwardOutlined';
import SunsetIcon from '@mui/icons-material/WbTwilightOutlined';
import InfoIconButton from './InfoIconButton';
import FormDialog from './FormDialog';
import convertCoordinatesToLV95 from './TransformToLV95.js';

function PopupContent({ clickPosition, showSuccessSnackbar, setShowSuccessSnackbar }) {
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
            <Box className="PopupBox">
                <Box className="IconBox">
                    <SunIcon/>
                    <ArrowDownwardIcon fontSize='3px'/>
                    <div marginleft="10px">hh:mm</div>
                </Box>
                <InfoIconButton tooltipText="Infotext" />
            </Box>
            <Box className="PopupBox">
                <Box className="IconBox">
                    <SunsetIcon/>
                    <ArrowDownwardIcon fontSize='3px'/>
                    <div>hh:mm</div>
                </Box>
                <InfoIconButton tooltipText="Infotext" />
            </Box>
            <Box className="PopupBox">
                <Box className="IconBox">
                    <SunIcon/>
                    <ArrowUpwardIcon fontSize='3px'/>
                    <div>hh:mm</div>
                </Box>
                <InfoIconButton tooltipText="Infotext" />
            </Box>
            <Box className="PopupBox">
                <Box className="IconBox">
                    <SunsetIcon/>
                    <ArrowUpwardIcon fontSize='3px'/>
                    <div>hh:mm</div>
                </Box>
                <InfoIconButton tooltipText="Infotext" />
            </Box>
            <Box className="PopupBox">
                <Box className="IconBox">
                    <SunIcon/>
                    <EyeIcon fontSize='3px'/>
                    <div>100%</div>
                </Box>
                <InfoIconButton tooltipText="Infotext" />
            </Box>
            <Box className="PopupBox">
                <Box className="IconBox">
                    <StarIcon/>
                    <EyeIcon fontSize='3px'/>
                    <div>100%</div>
                </Box>
                <InfoIconButton tooltipText="Infotext" />
            </Box>
            <br/> 
            <Box textAlign={'right'}>
                <Button
                    variant="contained"
                    sx={{
                        color: "white",
                        padding: '4px 10px',
                        fontSize: '0.8rem',
                        backgroundColor: "#334854",
                        '&:hover': {
                            backgroundColor: "#667784"
                        }

                    }}
                    onClick={handleAbonnierenClick}
                >
                    Abonnieren
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