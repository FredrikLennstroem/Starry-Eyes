import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Drawer, CssBaseline, IconButton, List, Typography, Divider } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Moon, Hemisphere } from "lunarphase-js";
import NewMoon from '../Images/Moon/Moon_1_New.png';
import WaxingCrescent from '../Images/Moon/Moon_2_Waxing_Crescent.png';
import FirstQuarter from '../Images/Moon/Moon_3_First_Quarter.png';
import WaxingGibbous from '../Images/Moon/Moon_4_Waxing_Gibbous.png';
import Full from '../Images/Moon/Moon_5_Full.png';
import WaningGibbous from '../Images/Moon/Moon_6_Waning_Gibbous.png';
import LastQuarter from '../Images/Moon/Moon_7_Last_Quarter.png';
import WaningCrescent from '../Images/Moon/Moon_8_Waning_Crescent.png';

const drawerWidth = 140;
const drawerHeight = 495;

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
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    marginTop: `calc(50vh - ${drawerHeight / 2}px)`,
  },
}));

export default function PersistentDrawerRight({ MoonOpen, setMoonOpen }) {

  const handleMoonClose = () => {
    setMoonOpen(false);
  };

  const todayPhase = Moon.lunarPhase(new Date(), { hemisphere: Hemisphere.NORTHERN });
  const tomorrowPhase = Moon.lunarPhase(new Date(new Date().getTime() + 24 * 60 * 60 * 1000), { hemisphere: Hemisphere.NORTHERN });
  const dayAfterTomorrowPhase = Moon.lunarPhase(new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000), { hemisphere: Hemisphere.NORTHERN });

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
          <Typography>Heute</Typography>
          <Box sx={{ padding: '3px 10px' }}>
            <img
              src={moonImages[todayPhase]}
              alt="Moonphase"
              title={`Heute: ${todayPhase}`}
              style={{ width: '100px', height: '100px' }}
            />
          </Box>
          <Divider />
          <Typography>Morgen</Typography>
          <Box sx={{ padding: '3px 10px' }}>
          <img
            src={moonImages[tomorrowPhase]}
            alt="Moonphase"
            title={`Morgen: ${tomorrowPhase}`}
            style={{ width: '100px', height: '100px' }}
          />
          </Box>
          <Divider />
          <Typography>Übermorgen</Typography>
          <Box sx={{ padding: '3px 10px' }}>
            <img
              src={moonImages[dayAfterTomorrowPhase]}
              alt="Moonphase"
              title={`Übermorgen: ${dayAfterTomorrowPhase}`}
              style={{ width: '100px', height: '100px' }}
            />
          </Box>
        </List>
        <Divider />
        <IconButton title= "Ausblenden" onClick={handleMoonClose}>
          <ChevronRightIcon />
        </IconButton>
      </CustomDrawer>
      <Main open={MoonOpen}>
      </Main>
    </Box>
  );
}
