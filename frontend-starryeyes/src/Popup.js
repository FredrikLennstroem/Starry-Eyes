import './App.css';
import {React, useState} from 'react';
import {Typography, Button, Box} from '@mui/material';
import StarIcon from '@mui/icons-material/AutoAwesomeOutlined';
import SunIcon from '@mui/icons-material/WbSunnyOutlined';
import EyeIcon from '@mui/icons-material/VisibilityOutlined';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownwardOutlined';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpwardOutlined';
import SunsetIcon from '@mui/icons-material/WbTwilightOutlined';
import InfoIconButton from './InfoIconButton';
import FormDialog from './FormDialog';

function PopupContent({ clickPosition }) {

    const [dialogOpen, setDialogOpen] = useState(false);

    const handleDialogOpen = () => {
      setDialogOpen(true);
    };
  
    const handleDialogClose = () => {
      setDialogOpen(false);
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
                    <div margin-left="10px">hh:mm</div>
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
                        backgroundColor: "#334854",
                        '&:hover': {
                            backgroundColor: "#667784"}}}
                    onClick={handleDialogOpen}
                    >Abonnieren
                </Button>
                <FormDialog
                    open={dialogOpen}
                    handleClose={handleDialogClose}
                    clickPosition={clickPosition}
                />
            </Box>  
        </div>
    );
}

export default PopupContent;
