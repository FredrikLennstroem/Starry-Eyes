// Dieser Code beinhaltet den Drawer mit allen Inhalten zu den Mondphasen
// Dieser Code wird in App.js importiert

import {React, useState} from 'react';
import { styled } from '@mui/material/styles';
import { Box, Drawer, IconButton, List, Typography, Divider } from '@mui/material';
import { Moon, Hemisphere } from "lunarphase-js";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import NewMoon from '../Images/Moon/Moon_1_New.png';
import WaxingCrescent from '../Images/Moon/Moon_2_Waxing_Crescent.png';
import FirstQuarter from '../Images/Moon/Moon_3_First_Quarter.png';
import WaxingGibbous from '../Images/Moon/Moon_4_Waxing_Gibbous.png';
import Full from '../Images/Moon/Moon_5_Full.png';
import WaningGibbous from '../Images/Moon/Moon_6_Waning_Gibbous.png';
import LastQuarter from '../Images/Moon/Moon_7_Last_Quarter.png';
import WaningCrescent from '../Images/Moon/Moon_8_Waning_Crescent.png';
import MondMenu from '../Images/Icons/MondMenu.png';

const drawerWidth = 140; // Breite des Drawers
const drawerHeight = 455; // Höhe des Drawers

// Die Main Komponente definiert das Aussehen des Öffnen und Schliessen des Drawers
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    display: 'flex',
    justifyContent: 'flex-end',
    ...(open && {
      marginRight: drawerWidth,
    }),
  }),
);

// Diese Komponente definiert das Aussehen des Drawers
const CustomDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    height: drawerHeight,
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'stretch',
    marginTop: `calc((100vh - ${drawerHeight}px)/2)`,
    zIndex: 1100,
  },
}));

export default function MoonDrawer() {
  const [MoonOpen, setMoonOpen] = useState(false); // Statusvariable des Drawers. Dieser ist Default geschlossen.
  const handleMoonOpen = () => {
    setMoonOpen(true);
  }; // Funktion beim Öffnen des Drawers
  const handleMoonClose = () => {
    setMoonOpen(false);
  }; // Funktion beim Schliessen des Drawers

  // Lädt die Mondphasen aus dem lunarphase-js Modul des aktuellen und der nächsten 2 Tage
  const todayPhase = Moon.lunarPhase(new Date(), { hemisphere: Hemisphere.NORTHERN });
  const tomorrowPhase = Moon.lunarPhase(new Date(new Date().getTime() + 24 * 60 * 60 * 1000), { hemisphere: Hemisphere.NORTHERN });
  const dayAfterTomorrowPhase = Moon.lunarPhase(new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000), { hemisphere: Hemisphere.NORTHERN });

  // Zuordnung der Bilder zur Mondphase  
  const moonImages = {
    'New': NewMoon,
    'Waxing Crescent': WaxingCrescent,
    'First Quarter': FirstQuarter,
    'Waxing Gibbous': WaxingGibbous,
    'Full': Full,
    'Waning Gibbous': WaningGibbous,
    'Last Quarter': LastQuarter,
    'Waning Crescent': WaningCrescent
  };

  // Zuordnung der Mondphasennamen in Deutsch zur Mondphase in Englisch
  const textPhase = {
    'New': 'Neumond',
    'Waxing Crescent': 'Zunehmende Mondsichel',
    'First Quarter': 'Erstes Viertel',
    'Waxing Gibbous': 'Zunehmender Mond',
    'Full': 'Vollmond',
    'Waning Gibbous': 'Abnehmender Mond',
    'Last Quarter': 'Letztes Viertel',
    'Waning Crescent': 'Abnehmende Mondsichel'
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CustomDrawer variant="persistent" anchor="right" open={MoonOpen}>
        <Typography variant="h6" fontWeight="bold" sx={{padding: '3px 3px'}}>
          Mondphasen
        </Typography>
        <Divider/>
        <List sx={{ width: '100%', padding: 0 }}>
          <Typography>
            Heute
          </Typography>
          <Box sx={{ padding: '3px 10px' }}>
            <img src={moonImages[todayPhase]} alt="Mondphase Heute" title={`Heute: ${textPhase[todayPhase]}`} style={{ width: '100px', height: '100px' }}/>
          </Box>
          <Divider/>
          <Typography>
            Morgen
          </Typography>
          <Box sx={{ padding: '3px 10px' }}>
            <img src={moonImages[tomorrowPhase]} alt="Mondphase Morgen" title={`Morgen: ${textPhase[tomorrowPhase]}`} style={{ width: '100px', height: '100px' }}/>
          </Box>
          <Divider/>
          <Typography>
            Übermorgen
          </Typography>
          <Box sx={{ padding: '3px 10px' }}>
            <img src={moonImages[dayAfterTomorrowPhase]} alt="Mondphase Übermorgen" title={`Übermorgen: ${textPhase[dayAfterTomorrowPhase]}`} style={{ width: '100px', height: '100px' }}/>
          </Box>
        </List>        
      </CustomDrawer>
      <Main open={MoonOpen}>
      </Main>

      {/* Mondicon zum Öffnen des Drawers */}
      <div style={{ position: 'absolute', top: `calc(50% - 10px)`, right: 0, zIndex: 1099 }}>
        <IconButton
          title="Mondphasen"
          onClick={handleMoonOpen}
          sx={{
            padding: 0.5,
            marginRight: 2,
            ...(MoonOpen && { display: 'none' }),
            backgroundColor: "#334854",
            '&:hover': {
              backgroundColor: "#667784",
              cursor: "pointer"}
        }}>
          <img src={MondMenu} alt="Logo" style={{ width: '50px', height: 'auto' }}/>
        </IconButton>
      </div>

      {/* Icon zum Schliessen des Drawers */}
      <div
        style={{ borderRadius: '50%', position: 'absolute', top: '50%', right: MoonOpen ? '142px' : '-40px', zIndex: 1050, transition: 'right 0.23s linear'}}>
        <IconButton title="Ausblenden" onClick={handleMoonClose} sx={{color: "white", backgroundColor: "#334854", '&:hover': {backgroundColor: "#667784"}}}>
          <ChevronRightIcon />
        </IconButton>
      </div>
    </Box>
  );
}