import React from 'react';
import './App.css';
import { Typography, Box } from '@mui/material';
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

const Symbologie = ({ MenuOpen }) => {
  return (
    <div>
    <div style={{ background: 'white', height: '100vh', width: '100%' }}>
      <div style={{ overflowY: 'auto', maxWidth: '100%', maxHeight: 'calc(100vh - 10px)', paddingTop: '70px', paddingLeft: MenuOpen ? '255px' : '10px', paddingRight: '10px', transition: 'padding-left 0.2s ease'}}>
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
            <img src={SunVisibility} alt="SunVisibility" style={{ width: '30px', height: '30px', marginLeft: '5px', marginRight: '5px' }} />
            <Typography sx={{ paddingLeft: '15px', textAlign: 'left' }}>Wahrscheinlichkeit, dass die Sonne am Horizont sichtbar sein wird</Typography>
          </Box>
          <Box className="IconBox">
            <img src={StarVisibility} alt="StarVisibility" style={{ width: '30px', height: '30px', marginLeft: '5px', marginRight: '5px' }} />
            <Typography sx={{ paddingLeft: '15px', textAlign: 'left'}}>Wahrscheinlichkeit, dass es eine klare Sternennacht gibt</Typography>
          </Box>
        </Box>
        <Typography fontWeight= 'bold' sx={{marginTop: '10px', textAlign: 'left'}}>Mondphasen</Typography>
        <Typography sx={{textAlign: 'left'}}>Die Berechnungen beruhen auf dem npm Modul{' '}
          <a href="https://www.npmjs.com/package/lunarphase-js" target="_blank" rel="noopener noreferrer">lunarphase-js</a>
        .</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: '5px' }}>
          <Box className="IconBox">
            <img src={NewMoon} alt="NewMoon" style={{ width: '30px', height: '30px', marginLeft: '5px', marginRight: '5px' }} />
            <Typography sx={{ paddingLeft: '15px', textAlign: 'left'}}>Neumond: Der Mond ist unsichtbar, da die beleuchtete Seite nicht von der Erde aus zu sehen ist.</Typography>
          </Box>
          <Box className="IconBox">
            <img src={WaxingCrescent} alt="WaxingCrescent" style={{ width: '30px', height: '30px', marginLeft: '5px', marginRight: '5px' }} />
            <Typography sx={{ paddingLeft: '15px', textAlign: 'left'}}>Zunehmende Mondsichel: Der Mond wird langsam sichtbar, nur eine kleine Mondsichel ist zu sehen.</Typography>
          </Box>
          <Box className="IconBox">
            <img src={FirstQuarter} alt="FirstQuarter" style={{ width: '30px', height: '30px', marginLeft: '5px', marginRight: '5px' }} />
            <Typography sx={{ paddingLeft: '15px', textAlign: 'left'}}>Erstes Viertel: Die rechte Hälfte des Mondes ist beleuchtet, es ist ein Halbmond zu sehen.</Typography>
          </Box>
          <Box className="IconBox">
            <img src={WaxingGibbous} alt="WaxingGibbous" style={{ width: '30px', height: '30px', marginLeft: '5px', marginRight: '5px' }} />
            <Typography sx={{ paddingLeft: '15px', textAlign: 'left'}}>Zunehmender Mond: Der Mond wird immer heller, mehr als die Hälfte der sichtbaren Seite ist beleuchtet.</Typography>
          </Box>
          <Box className="IconBox">
            <img src={Full} alt="Full" style={{ width: '30px', height: '30px', marginLeft: '5px', marginRight: '5px' }} />
            <Typography sx={{ paddingLeft: '15px', textAlign: 'left'}}>Vollmond: Der gesamte Mond ist von der Erde aus sichtbar und erscheint als helle Scheibe.</Typography>
          </Box>
          <Box className="IconBox">
            <img src={WaningGibbous} alt="WaningGibbous" style={{ width: '30px', height: '30px', marginLeft: '5px', marginRight: '5px' }} />
            <Typography sx={{ paddingLeft: '15px', textAlign: 'left'}}>Abnehmender Mond: Der Mond wird wieder dunkler, weniger als die Hälfte der sichtbaren Seite ist beleuchtet.</Typography>
          </Box>
          <Box className="IconBox">
            <img src={LastQuarter} alt="LastQuarter" style={{ width: '30px', height: '30px', marginLeft: '5px', marginRight: '5px' }} />
            <Typography sx={{ paddingLeft: '15px', textAlign: 'left'}}>Letztes Viertel: Die linke Hälfte des Mondes ist beleuchtet, es ist ein weiterer Halbmond zu sehen.</Typography>
          </Box>
          <Box className="IconBox">
            <img src={WaningCrescent} alt="WaningCrescent" style={{ width: '30px', height: '30px', marginLeft: '5px', marginRight: '5px' }} />
            <Typography sx={{ paddingLeft: '15px', textAlign: 'left'}}>Abnehmende Mondsichel: Der Mond wird langsam unsichtbar, nur noch eine kleine Mondsichel ist zu sehen.</Typography>
          </Box>
        </Box>
      </div>
    </div>
    </div>
  );
};

export default Symbologie;