import React from 'react';
import { styled } from '@mui/material/styles';
import '../App.css';
import { Box, Drawer, Typography, CssBaseline, List, Divider, IconButton, ListItem, ListItemText, Checkbox, Slider } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const drawerWidth = 240;

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

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const IconWrapper = styled('div')({
  marginLeft: 'auto'
});

export default function PersistentDrawerLeft({activeItems, setActiveItems, sliderValue, setSliderValue, MenuOpen, setMenuOpen}) {

  const handleDrawerClose = () => {
    setMenuOpen(false);
  };

  const handleCheckboxChange = (index) => {
    const updatedActiveItems = [...activeItems];
    updatedActiveItems[index] = !updatedActiveItems[index];
    setActiveItems(updatedActiveItems);
  };

  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue);
  };

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = Math.abs(minutes % 60);
    return `${Math.abs(hours).toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  };

  const handleIncrement = () => {
    setSliderValue((prevValue) => prevValue - 15);
  };

  const handleDecrement = () => {
    setSliderValue((prevValue) => prevValue + 15);
  };

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
        open={MenuOpen}
      >
        <DrawerHeader>
          <Typography
            fontWeight= "bold"
            variant="h6"
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
          <ListItem>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ display: 'flex', alignItems: 'center'}}>
                <Checkbox
                  className='Checkbox'
                  checked={activeItems[0]}
                  onChange={() => handleCheckboxChange(0)}
                />
                <ListItemText primary="Hillshade" />
              </Box>
              {activeItems[0] && (
                <div>
                  <IconButton onClick={handleDecrement} size="small">
                    <AddIcon />
                  </IconButton>
                  <Slider
                    value={sliderValue}
                    onChange={handleSliderChange}
                    aria-labelledby="continuous-slider"
                    min={0}
                    max={1425}
                    step={15}
                    style={{width:'150px', marginLeft: '2px', color:'#334854'}}
                  />
                  <IconButton onClick={handleIncrement} size="small">
                    <RemoveIcon />
                  </IconButton>
                  <Box marginLeft="8px">{formatTime(sliderValue)}</Box>
                </div>
              )}
            </Box>
          </ListItem>
          <ListItem>
            <Checkbox
              className='Checkbox'
              checked={activeItems[1]}
              onChange={() => handleCheckboxChange(1)}
            />
            <ListItemText primary="Lightpolution" />
          </ListItem>
            {activeItems[1] &&
            <ListItem style={{padding: '0px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: '60px'}}>
              <Typography fontWeight= "bold" marginBottom= "5px">Legende</Typography>
              <img src="http://localhost:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=StarryEyes:viirs_npp_202300&legend_options=fontName:Arial;fontSize:23;dx:10" alt="Legend" style={{ width: 'auto', height: '100px' }} />
            </ListItem>} 
          <ListItem>
            <Checkbox
              className='Checkbox'
              checked={activeItems[2]}
              onChange={() => handleCheckboxChange(2)}
            />
            <ListItemText primary="Pixelkarte Grau" />
          </ListItem>
          <Divider />
          <ListItem button component={Link} to="/symbologie">
            <ListItemText primary="Symbologie" sx={{ paddingLeft: '42px'}}/>
          </ListItem>
        </List>
        <List sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
            <ListItem sx={{ marginTop: 'auto', marginBottom: '0px' }}>
              <Typography variant="body2" sx={{ color: 'blue', textDecoration: 'underline', fontSize: 'smaller' }}>
                <a href="https://github.com/FredrikLennstroem/Starry-Eyes" target="_blank" rel="noopener noreferrer">GitHub-Page</a>
              </Typography>
            </ListItem>
        </List>
      </Drawer>
      <Main open={MenuOpen}>
      </Main>
    </Box>
  );
}