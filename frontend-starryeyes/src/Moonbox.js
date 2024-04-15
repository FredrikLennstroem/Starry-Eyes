import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Moonphase from './Images/Moon_1.jpg';

const drawerWidth = 150;
const drawerHeight = 535;

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
        <DrawerHeader>
          <IconButton onClick={handleMoonClose}>
            <ChevronRightIcon />
          </IconButton>
          <Typography fontWeight="bold" variant="h6">Mondphasen</Typography>
        </DrawerHeader>
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
      </CustomDrawer>
      <Main open={MoonOpen}>
        <DrawerHeader />
      </Main>
    </Box>
  );
}
