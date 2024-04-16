import React from 'react';
import Logo from './Images/StarryEyes_Logo_1.png';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';


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
    </div>
  );
};

export default Symbologie;