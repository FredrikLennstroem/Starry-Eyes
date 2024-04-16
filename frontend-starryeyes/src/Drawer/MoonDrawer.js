import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Drawer, CssBaseline, IconButton, List, Typography, Divider } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Moonphase from '../Images/Moon_1.jpg';

const drawerWidth = 150;
const drawerHeight = 555;

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

const CustomDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    height: drawerHeight,
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start', // Änderung auf 'flex-start' für vertikale Ausrichtung
    alignItems: 'stretch', // Änderung auf 'stretch' für horizontale Ausrichtung
    marginTop: `calc(50vh - ${drawerHeight / 2}px)`, // Vertikal zentriert
  },
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PersistentDrawerRight({ MoonOpen, setMoonOpen }) {

  const handleMoonClose = () => {
    setMoonOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <CustomDrawer
        variant="persistent"
        anchor="right"
        open={MoonOpen}
      >
        <Typography 
          fontWeight="bold"
          variant="h6"
          sx={{
            padding: '3px 3px'
          }}
          >Mondphasen
        </Typography>
        <Divider />
        <List sx={{ width: '100%', padding: 0 }}>
          Heute
          <Box sx={{ padding: '3px 10px' }}>
            <img
              src={Moonphase}
              alt="Moonphase"
              style={{ width: '120px', height: '120px' }}
            />
          </Box>
          <Divider />
          Morgen
          <Box sx={{ padding: '3px 10px' }}>
            <img
              src={Moonphase}
              alt="Moonphase"
              style={{ width: '120px', height: '120px' }}
            />
          </Box>
          <Divider />
          Übermorgen
          <Box sx={{ padding: '3px 10px' }}>
            <img
              src={Moonphase}
              alt="Moonphase"
              style={{ width: '120px', height: '120px' }}
            />
          </Box>
        </List>
        <Divider />
        <IconButton onClick={handleMoonClose}>
          <ChevronRightIcon />
        </IconButton>
      </CustomDrawer>
      <Main open={MoonOpen}>
        <DrawerHeader />
        
      </Main>
    </Box>
  );
}
