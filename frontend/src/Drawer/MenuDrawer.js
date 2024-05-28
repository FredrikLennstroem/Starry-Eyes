// Hier sind alle Inhalte des Layermanagers definiert
// Dieser Code wir in App.js importiert

import React from 'react';
import { styled } from '@mui/material/styles';
import '../App.css';
import { Box, Drawer, Typography, CssBaseline, List, Divider, IconButton, ListItem, ListItemText, Checkbox, Slider } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const drawerWidth = 240; // Breite des Drawers

// Die Main Komponente definiert das Aussehen des Öffnen und Schliessen des Drawers
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

// Styling des Drawertitels
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

// Styling des IconWrapper
const IconWrapper = styled('div')({
  marginLeft: 'auto'
});

// Funktion rundet die aktuelle Uhrzeit auf Viertelstunden
function roundToQuarterHour(date) {
  const quarterHour = 15 * 60 * 1000;
  return new Date(Math.ceil(date.getTime() / quarterHour) * quarterHour);
}

export default function MenuDrawer({activeItems, setActiveItems, sliderValue, setSliderValue, LayerMenuOpen, setLayerMenuOpen}) {

  const handleDrawerClose = () => {
    setLayerMenuOpen(false);
  }; // Funktion zum schliessen des Drawers

  const handleCheckboxChange = (index) => {
    const updatedActiveItems = [...activeItems];
    updatedActiveItems[index] = !updatedActiveItems[index];
    setActiveItems(updatedActiveItems); // Aktualisierung der Statusvariablen bei Änderungen der Checkboxen
    
    if (!updatedActiveItems[0]) {
      const now = roundToQuarterHour(new Date());
      const hours = now.getHours();
      const minutes = now.getMinutes();
      setSliderValue(hours * 60 + minutes);
    } // Berechnen der aktuellen Uhrzeit mit richtiger Darstellung, falls der Schattenlayer eingeschaltet wird
  };

  // Min- und Max-Werte für den Slider in Minuten, muss evtl. auf die Daten angepasst werden
  const minSliderValue = 0; // für 6:45 Wert 405
  const maxSliderValue = 1425; // für 19:00 Wert 1140

  const handleSliderChange = (event, newValue) => {
    if (newValue >= minSliderValue && newValue <= maxSliderValue) {
      setSliderValue(newValue);
    }
  }; // Aktualisierung des Sliderwerts, falls dieser geändert wird

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = Math.abs(minutes % 60);
    return `${Math.abs(hours).toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  }; // Funktion formatiert die aktuelle Uhrzeit für die Darstellung

  const handleIncrement = () => {
    if (sliderValue - 15 >= minSliderValue) {
      setSliderValue((prevValue) => prevValue - 15);}}; // Verunmöglicht den Unterlauf des Sliders unter den minValue
  
  const handleDecrement = () => {
    if (sliderValue + 15 <= maxSliderValue) {
      setSliderValue((prevValue) => prevValue + 15);}}; // Verunmöglicht den Überlauf des Sliders über den maxValue

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={LayerMenuOpen}
      >
        <DrawerHeader>
          <Typography
            fontWeight= "bold"
            variant="h6"
            marginLeft="20px"
            >
            Layermanager
          </Typography>
          <IconWrapper>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </IconWrapper>
        </DrawerHeader>
        <Divider />
        <List>
          {/* 1. Layereintrag (Schattenlayer) */}
          <ListItem>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ display: 'flex', alignItems: 'center'}}>
                <Checkbox
                  className='Checkbox'
                  checked={activeItems[0]}
                  onChange={() => handleCheckboxChange(0)}
                />
                <ListItemText primary="Schatten" />
                {activeItems[0] && ( // Aktueller Sliderwert wird nur angezeigt, falls der Layer aktiviert ist
                  <Box marginRight="10px">
                    {formatTime(sliderValue)}
                  </Box>)}
              </Box>
              {activeItems[0] && ( // Slider wird nur geladen, falls der Layer aktiviert ist
                <div style={{ marginLeft: '5px', display: 'flex', alignItems: 'center' }}>
                  <IconButton onClick={handleIncrement} size="small" disabled={sliderValue === 0}>
                    <RemoveIcon />
                  </IconButton>
                  <Slider
                    value={sliderValue}
                    onChange={handleSliderChange}
                    aria-labelledby="continuous-slider"
                    min={minSliderValue}
                    max={maxSliderValue}
                    step={15}
                    style={{width:'130px', marginLeft: '4px', marginRight: '4px', color:'#334854'}}
                  />
                  <IconButton onClick={handleDecrement} size="small" disabled={sliderValue === 1425}>
                    <AddIcon />
                  </IconButton>
                </div>
              )}
            </Box>
          </ListItem>

          {/* 2. Layereintrag (Lichtverschmutzungslayer) */}
          <ListItem>
            <Checkbox
              className='Checkbox'
              checked={activeItems[1]}
              onChange={() => handleCheckboxChange(1)}
            />
            <ListItemText primary="Lichtverschmutzung" />
          </ListItem>
            {activeItems[1] && // Legende wird nur geladen und angezeigt, falls der Layer aktiviert ist
            <ListItem style={{width: '179px', padding: '0px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: '60px', marginBottom: '5px'}}>
              <Typography fontWeight= "bold" marginBottom= "5px" >Legende</Typography>
              <img src="http://localhost:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=StarryEyes:Lichtverschmutzung_CH_2024&legend_options=fontName:Arial;fontSize:15;dx:10" alt="Legend" style={{ width: 'auto', height: '100px' }} />
            </ListItem>} 
          <Divider />

          {/* 3. Layereintrag (Symbolerklärung) */}
          <ListItem>
            <Checkbox
              className='Checkbox'
              checked={activeItems[2]}
              onChange={() => handleCheckboxChange(2)}
            />
            <ListItemText primary="Symbolerklärung"/>
          </ListItem>
        </List>

        {/* GitHub Link */}
        <List sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
            <ListItem sx={{ marginTop: 'auto', marginBottom: '0px' }}>
              <Typography variant="body2" sx={{ color: 'blue', textDecoration: 'underline', fontSize: 'smaller' }}>
                <a href="https://github.com/FredrikLennstroem/Starry-Eyes" target="_blank" rel="noopener noreferrer">GitHub-Page</a>
              </Typography>
            </ListItem>
        </List>
      </Drawer>
      <Main open={LayerMenuOpen}>
      </Main>
    </Box>
  );
}