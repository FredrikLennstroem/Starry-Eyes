import React from 'react';
import './App.css';
import Logo from './Images/StarryEyes_Logo_1.png';
import { Button, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import SunsetTerrain from './Images/Icons/Sonnenuntergang_Gelände.png';
import SunsetHorizon from './Images/Icons/Sonnenuntergang_Horizont.png';
import SunriseHorizon from './Images/Icons/Sonnenaufgang_Horizont.png';
import SunriseTerrain from './Images/Icons/Sonnenaufgang_Gelände.png';
import SunVisibility from './Images/Icons/Sonne_Auge.png';
import StarVisibility from './Images/Icons/Stern_Auge.png';
import NewMoon from './Images/Moon/Moon_1_New.png';
import WaxingCrescent from './Images/Moon/Moon_2_Waxing_Crescent.png';
import FirstQuarter from './Images/Moon/Moon_3_First_Quarter.png';
import WaxingGibbous from './Images/Moon/Moon_4_Waxing_Gibbous.png';
import Full from './Images/Moon/Moon_5_Full.png';
import WaningGibbous from './Images/Moon/Moon_6_Waning_Gibbous.png';
import LastQuarter from './Images/Moon/Moon_7_Last_Quarter.png';
import WaningCrescent from './Images/Moon/Moon_8_Waning_Crescent.png';


const Symbologie = () => {
  return (
    <div>
      <div style={{ position: 'absolute', top: '15px', left: '15px', zIndex: 1000 }}>
        <Button 
          variant="contained" 
          component={Link}
          to="/"
          sx={{ color: "white", padding: '4px 10px', fontSize: '0.8rem', backgroundColor: "#334854", 
            '&:hover': { backgroundColor: "#667784" } }} >
        Zurück
        </Button>
      </div>
      <div style={{ position: 'absolute', top: '15px', right: '30px', zIndex: 1000 }}>
        <img
        src={Logo}
        alt="Logo"
        style={{ width: '150px', height: '50px' }}
        />
      </div>
      <div style={{ overflow: 'auto', position: 'absolute', maxWidth: '600px', maxHeight: 'calc(100vh - 100px)', top: '80px', left: '15px', padding: '10px'}}>
        <Typography fontWeight= "bold" variant="h6" sx={{textAlign: 'left'}}>Symbolerklärungen</Typography>
        <Typography fontWeight= 'bold' sx={{marginTop: '10px', textAlign: 'left'}}>Standortinformationen</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: '5px' }}>
          <Box className="IconBox">
            <img src={SunsetTerrain} alt="SunsetTerrain" style={{ width: '40px', height: '30px' }} />
            <Typography sx={{ paddingLeft: '15px'}}>Sonnenuntergang hinter dem Gelände</Typography>
          </Box>
          <Box className="IconBox">
            <img src={SunsetHorizon} alt="SunsetHorizon" style={{ width: '40px', height: '30px' }} />
            <Typography sx={{ paddingLeft: '15px', textAlign: 'left'}}>Sonnenuntergang am theoretischen Horizont</Typography>
          </Box>
          <Box className="IconBox">
            <img src={SunriseHorizon} alt="SunriseHorizon" style={{ width: '40px', height: '30px' }} />
            <Typography sx={{ paddingLeft: '15px', textAlign: 'left'}}>Sonnenaufgang am theoretischen Horizont</Typography>
          </Box>
          <Box className="IconBox">
            <img src={SunriseTerrain} alt="SunriseTerrain" style={{ width: '40px', height: '30px' }} />
            <Typography sx={{ paddingLeft: '15px', textAlign: 'left'}}>Sonnenaufgang hinter dem Gelände</Typography>
          </Box>
          <Box className="IconBox">
            <img src={SunVisibility} alt="SunVisibility" style={{ width: '30px', height: '30px', paddingLeft: '5px', paddingRight: '5px' }} />
            <Typography sx={{ paddingLeft: '15px', textAlign: 'left' }}>Wahrscheinlichkeit, dass die Sonne am Horizont sichtbar sein wird</Typography>
          </Box>
          <Box className="IconBox">
            <img src={StarVisibility} alt="StarVisibility" style={{ width: '30px', height: '30px', paddingLeft: '5px', paddingRight: '5px' }} />
            <Typography sx={{ paddingLeft: '15px', textAlign: 'left'}}>Wahrscheinlichkeit, dass es eine klare Sternennacht gibt</Typography>
          </Box>
        </Box>
        <Typography fontWeight= 'bold' sx={{marginTop: '10px', textAlign: 'left'}}>Mondphasen</Typography>
        <Typography sx={{textAlign: 'left'}}>Erläuterung, woher die Symbole kommen und link zur seite</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: '5px' }}>
          <Box className="IconBox">
            <img src={NewMoon} alt="NewMoon" style={{ width: '30px', height: '30px', paddingLeft: '5px', paddingRight: '5px'  }} />
            <Typography sx={{ paddingLeft: '15px', textAlign: 'left'}}>Neumond</Typography>
          </Box>
          <Box className="IconBox">
            <img src={WaxingCrescent} alt="WaxingCrescent" style={{ width: '30px', height: '30px', paddingLeft: '5px', paddingRight: '5px'  }} />
            <Typography sx={{ paddingLeft: '15px', textAlign: 'left'}}>WaxingCrescent</Typography>
          </Box>
          <Box className="IconBox">
            <img src={FirstQuarter} alt="FirstQuarter" style={{ width: '30px', height: '30px', paddingLeft: '5px', paddingRight: '5px'  }} />
            <Typography sx={{ paddingLeft: '15px', textAlign: 'left'}}>FirstQuarter</Typography>
          </Box>
          <Box className="IconBox">
            <img src={WaxingGibbous} alt="WaxingGibbous" style={{ width: '30px', height: '30px', paddingLeft: '5px', paddingRight: '5px'  }} />
            <Typography sx={{ paddingLeft: '15px', textAlign: 'left'}}>WaxingGibbous</Typography>
          </Box>
          <Box className="IconBox">
            <img src={Full} alt="Full" style={{ width: '30px', height: '30px', paddingLeft: '5px', paddingRight: '5px'  }} />
            <Typography sx={{ paddingLeft: '15px', textAlign: 'left'}}>Full</Typography>
          </Box>
          <Box className="IconBox">
            <img src={WaningGibbous} alt="WaningGibbous" style={{ width: '30px', height: '30px', paddingLeft: '5px', paddingRight: '5px'  }} />
            <Typography sx={{ paddingLeft: '15px', textAlign: 'left'}}>WaningGibbous</Typography>
          </Box>
          <Box className="IconBox">
            <img src={LastQuarter} alt="LastQuarter" style={{ width: '30px', height: '30px', paddingLeft: '5px', paddingRight: '5px'  }} />
            <Typography sx={{ paddingLeft: '15px', textAlign: 'left'}}>LastQuarter</Typography>
          </Box>
          <Box className="IconBox">
            <img src={WaningCrescent} alt="WaningCrescent" style={{ width: '30px', height: '30px', paddingLeft: '5px', paddingRight: '5px'  }} />
            <Typography sx={{ paddingLeft: '15px', textAlign: 'left'}}>WaningCrescent</Typography>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default Symbologie;