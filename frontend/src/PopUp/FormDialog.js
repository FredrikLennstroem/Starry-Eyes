// Dieser Code beinhaltet den ganzen Inhalt des Eingabefenster für die Standortüberwachung
// Dieser Code wird in PopupContent.js importiert

import React, { useState } from 'react';
import '../App.css';
import {MapContainer, WMSTileLayer, Marker} from "react-leaflet";
import {Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, CircularProgress, Checkbox} from'@mui/material';
import MarkerIcon from '../PopUp/MarkerIcon.js';

export default function FormDialog({ open, handleClose, clickPosition, lv95Coords, setShowSuccessSnackbar }) {
  const [loading, setLoading] = useState(false); // Variable des Übermittlungsstatus der E-Mail-Adresse

  const handleSubmit = async (event) => { // Schnittstelle Frontend und Backend. Hier werden Angaben für das Versenden der E-Mail-Adresse übermittelt
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.target);
    const formJson = Object.fromEntries(formData.entries());
    try {
      const response = await fetch('http://127.0.0.1:8000/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ // Inhalte der Post Anfrage
          email: formJson.email,
          latitude: clickPosition.lat.toFixed(6),
          longitude: clickPosition.lng.toFixed(6),
          easting: parseFloat(lv95Coords.easting).toFixed(3),
          northing: parseFloat(lv95Coords.northing).toFixed(3),
        })
      });

      if (response.ok) {
        setShowSuccessSnackbar(true); // Anzeige der SuccessSnackbar bei erfolgreichen Übermittlung
        handleClose();
        setTimeout(() => {
          setShowSuccessSnackbar(false);
        }, 2000); // Anzeigedauer der Snackbar
      } else {
        console.error('Subscription failed');
      }
    } catch (error) {
      console.error('Error subscribing:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit,
          style: {borderRadius: '0px'}
        }}
      >
        <DialogTitle fontWeight="bold" variant="h6">Ort überwachen</DialogTitle>
        <DialogContent>
          
          <MapContainer
            center={clickPosition}
            zoom={16}
            dragging={false}
            scrollWheelZoom={false}
            zoomControl={false}
            style={{width: '100% - 10px', height: '300px'}}
          >
            <WMSTileLayer
              layers="ch.swisstopo.swisstlm3d-karte-farbe"
              url="https://wms.geo.admin.ch/?"
              attribution= '&copy; <a href="https://www.swisstopo.ch/copyright">Swisstopo</a>'
              format="image/png"
              transparent={true}
              tileSize={512}
            />
            <Marker
              position={clickPosition}
              icon={MarkerIcon}
            />
          </MapContainer>

          <DialogContentText fontSize= '12px'>
            E/N: {lv95Coords ? parseFloat(lv95Coords.easting).toFixed(3) : 'Loading...'}
            /{lv95Coords ? parseFloat(lv95Coords.northing).toFixed(3) : 'Loading...'}
          </DialogContentText>

          Um detaillierte Informationen über diesen Standort zu erhalten, geben Sie bitte Ihre E-Mail-Adresse ein.

          <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
              <Checkbox className='Checkbox' style={{ marginTop: 4 }} disabled={true}/>
              <DialogContentText style={{ padding: 0, paddingTop: 12, paddingLeft: 4 }}>
                Durch bestätigen der Checkbox erhalten Sie stündliche Updates während der Nacht. Ihre E-Mail-Adresse wird am folgenden Tag wieder gelöscht.
              </DialogContentText>
            </div>
            <div style={{ position: 'absolute', bottom: 0, left: 70, transform: 'rotate(-5deg)', transformOrigin: 'left bottom', whiteSpace: 'nowrap', fontWeight: 'bold', fontSize: '25px', color: 'red' }}>
              -- Funktion noch nicht verfügbar --
            </div>
          </div>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="E-Mail-Adresse"
            type="email"
            fullWidth
            variant="standard"
            InputLabelProps={{
              style: {color: '#334854'}
            }}
            sx={{
              '& .MuiInputBase-root': {color: 'black',
                '&:before': {borderBottomColor: '#334854'},
                '&:after': {borderBottomColor: '#334854'}
              }
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
            disabled={loading}
              sx={{
              color: "white",
              padding: '4px 10px',
              fontSize: '0.8rem',
              borderRadius: "0%",
              backgroundColor: "#334854",
              position: 'relative',
              '&:hover': {
                backgroundColor: "#667784"
                },
              '&:disabled': {
                color: "#334854",
                backgroundColor: "#667784"
                }
              }}
          >Bestätigen{loading ? <CircularProgress size={24} sx={{position: 'absolute', color: "white"}} /> : ''}
          </Button>
        </DialogActions>
      </Dialog>
  );
}