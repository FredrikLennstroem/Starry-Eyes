import React from 'react';
import { Snackbar, Slide } from '@mui/material';

export default function SuccessSnackbar({ open }) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={2000}
      onClose={() => {}}
      message="Emailadresse übermittelt"
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      TransitionComponent={Slide}
      ContentProps={{
        sx: {
          backgroundColor: 'rgba(0, 100, 0, 0.9)',
          color: 'white'}
      }}
    />
    
  );
}
