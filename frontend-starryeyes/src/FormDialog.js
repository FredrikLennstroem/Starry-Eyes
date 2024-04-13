import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormDialog({ open, handleClose, clickPosition, lv95Coords }) {
    const handleSubmit = async (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const formJson = Object.fromEntries(formData.entries());
      try {
        const response = await fetch('http://localhost:5000/api/subscription', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formJson.email,
            latitude: clickPosition.lat.toFixed(6),
            longitude: clickPosition.lng.toFixed(6),
            easting: parseFloat(lv95Coords.easting).toFixed(3),
            northing: parseFloat(lv95Coords.northing).toFixed(3),
          })
        });
        if (response.ok) {
          console.log('Subscription successful');
          handleClose();
        } else {
          console.error('Subscription failed');
        }
      } catch (error) {
        console.error('Error subscribing:', error);
      }
    };
  
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle fontWeight="bold" variant="h6">Ort abonnieren</DialogTitle>
        <DialogContent>
          Standortkoordinaten:
          <br/>
          <DialogContentText>
              Easting: {lv95Coords ? parseFloat(lv95Coords.easting).toFixed(3) : 'Loading...'}
          </DialogContentText>
          <DialogContentText>
              Northing: {lv95Coords ? parseFloat(lv95Coords.northing).toFixed(3) : 'Loading...'}
          </DialogContentText>
          <br/>
          Um diesen Standort über Nacht zu überwachen, geben Sie bitte Ihre E-Mail-Adresse ein.
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Email Adresse"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Abbrechen</Button>
          <Button type="submit">Bestätigen</Button>
        </DialogActions>
      </Dialog>
    );
  }
  