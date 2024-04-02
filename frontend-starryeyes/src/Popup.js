import './App.css';
import React from 'react';
import {Typography, Button, Box} from '@mui/material';
import InfoIcon from '@mui/icons-material/InfoOutlined';
import StarIcon from '@mui/icons-material/AutoAwesomeOutlined';
import SunIcon from '@mui/icons-material/WbSunnyOutlined';
import EyeIcon from '@mui/icons-material/VisibilityOutlined';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownwardOutlined';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpwardOutlined';
import SunsetIcon from '@mui/icons-material/WbTwilightOutlined';

function PopupContent({ clickPosition }) {
    return (
        <div>
            <Typography fontWeight= "bold" variant="h6">
                Aktuelle Infos
            </Typography>
            Standortkoordinaten:
            <br/>
            Latitude: {clickPosition.lat}
            <br/>
            Longitude: {clickPosition.lng}
            <br/>
            <br/>
            <Box className="PopupBox">
                <Box className="IconBox">
                    <SunIcon/>
                    <ArrowDownwardIcon fontSize='3px'/>
                    <div margin-left="10px">hh:mm</div>
                </Box>
                <InfoIcon className='InfoIcon'/>
            </Box>
            <br/>
            <Box className="PopupBox">
                <Box className="IconBox">
                    <SunsetIcon/>
                    <ArrowDownwardIcon fontSize='3px'/>
                    <div>hh:mm</div>
                </Box>
                <InfoIcon className='InfoIcon'/>
            </Box>
            <br/>
            <Box className="PopupBox">
                <Box className="IconBox">
                    <SunIcon/>
                    <ArrowUpwardIcon fontSize='3px'/>
                    <div>hh:mm</div>
                </Box>
                <InfoIcon className='InfoIcon'/>
            </Box>
            <br/>
            <Box className="PopupBox">
                <Box className="IconBox">
                    <SunsetIcon/>
                    <ArrowUpwardIcon fontSize='3px'/>
                    <div>hh:mm</div>
                </Box>
                <InfoIcon className='InfoIcon'/>
            </Box>
            <br/>
            <Box className="PopupBox">
                <Box className="IconBox">
                    <SunIcon/>
                    <EyeIcon fontSize='3px'/>
                    <div>100%</div>
                </Box>
                <InfoIcon className='InfoIcon'/>
            </Box>
            <br/>
            <Box className="PopupBox">
                <Box className="IconBox">
                    <StarIcon/>
                    <EyeIcon fontSize='3px'/>
                    <div>100%</div>
                </Box>
                <InfoIcon className='InfoIcon'/>
            </Box>
            <br/>            
            <Button variant="outlined" className='subscribeButton'>Abonnieren</Button>
        </div>
    );
}

export default PopupContent;
