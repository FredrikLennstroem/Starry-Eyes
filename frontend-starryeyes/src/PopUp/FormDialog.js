import React from 'react';
import {MapContainer, WMSTileLayer, Marker} from "react-leaflet";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from'@mui/material';
import MarkerIcon from '../PopUp/MarkerIcon.js';

export default function FormDialog({ open, handleClose, clickPosition, lv95Coords, setShowSuccessSnackbar }) {

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formJson = Object.fromEntries(formData.entries());
    try {
      const response = await fetch('http://127.0.0.1:8000/email', {
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
        setShowSuccessSnackbar(true);
        handleClose();
        setTimeout(() => {
          setShowSuccessSnackbar(false);
        }, 2000);
      } else {
        console.error('Subscription failed');
      }
    } catch (error) {
      console.error('Error subscribing:', error);
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle fontWeight="bold" variant="h6">Ort überwachen</DialogTitle>
        <MapContainer
          center={clickPosition}
          zoom={16}
          dragging={false}
          scrollWheelZoom={false}
          zoomControl={false}
          style={{width: '100% - 10px', height: '300px', margin: '5px'}}
        >
          <WMSTileLayer
            layers="ch.swisstopo.swisstlm3d-karte-farbe"
            url="https://wms.geo.admin.ch/?"
            format="image/png"
            transparent={true}
            tileSize={512}
          />
          <Marker
            position={clickPosition}
            icon={MarkerIcon}
          />
        </MapContainer>
        <DialogContentText fontSize= '12px' marginLeft= '5px'>
          E/N: {lv95Coords ? parseFloat(lv95Coords.easting).toFixed(3) : 'Loading...'}
          /{lv95Coords ? parseFloat(lv95Coords.northing).toFixed(3) : 'Loading...'}
        </DialogContentText>
        <DialogContent>
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
            sx={{
              '& .MuiInputLabel-root': {
                color: 'black'
              },
              '& .MuiInputBase-root': {
                  color: '#334854',
                  '&:before': {
                      borderBottomColor: '#334854',
                  },
                  '&:after': {
                      borderBottomColor: '#334854'
                  },
              },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant="outlined"
              sx={{
              color: "#334854",
              padding: '3px 9px',
              fontSize: '0.8rem',
              borderColor: "#334854",
              borderRadius: "0%",
              backgroundColor: "white",
              '&:hover': {
                backgroundColor: "#667784",
                borderColor: "#334854",
                color: "white"
                }
              }}
            >Abbrechen
            </Button>
          <Button
            type="submit"
            variant="contained"
              sx={{
              color: "white",
              padding: '4px 10px',
              fontSize: '0.8rem',
              borderRadius: "0%",
              backgroundColor: "#334854",
              '&:hover': {
                backgroundColor: "#667784"
                }
              }}
            >Bestätigen
            </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}