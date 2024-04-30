import {MapContainer, WMSTileLayer, TileLayer, Marker, Popup, ZoomControl, useMapEvents} from "react-leaflet";
import './App.css';
import React, {useState} from 'react';
import PopupContent from './PopUp/Popup.js';
import MarkerIcon from './PopUp/MarkerIcon.js';
import SuccessSnackbar from './SuccessSnackbar.js';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from './Images/StarryEyes_Logo_1.png';
import MondMenu from './Images/Icons/MondMenu.png';
import Symbologie from "./Symbologie.js";

function MapClickHandler({ setClickPosition }) {
    useMapEvents({
        click(e) {
            setClickPosition(e.latlng);
        }
    });

    return null;
}

function App({ activeItems, sliderValue, setMoonOpen, MoonOpen, setMenuOpen, MenuOpen }) {
    const [clickPosition, setClickPosition] = useState([47.535, 7.642]);
    const bounds = [
        [45.659168946713827, 5.8358140744676303], // Südwestliche Grenze
        [47.869910020393519, 10.979311848153316]  // Nordöstliche Grenze
    ];
    const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false); // Anzeige für erfolgreiches abonnieren
    const handleMoonOpen = () => {
        setMoonOpen(true);
    };
    const handleDrawerOpen = () => {
        setMenuOpen(true);
    };

    const formatSliderValue = (value) => {
        const hours = Math.floor(value / 60);
        const minutes = value % 60;
        console.log(`${hours}_${minutes.toString().padStart(2, '0')}`);
        return `${hours}_${minutes.toString().padStart(2, '0')}`;
      };

    const [sunTimes, setSunTimes] = useState({
        sunsetTerrain: 'hh:mm',
        sunsetHorizon: 'hh:mm',
        sunriseHorizon: 'hh:mm',
        sunriseTerrain: 'hh:mm',
        sunsetCloud: '--'
    });

    const handleMarkerClick = () => {
        console.log("Popup geöffnet");
        const fetchSunTimes = async () => {
            try {
                const response = await fetch ('http://127.0.0.1:8000/sun', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        latitude: clickPosition.lat.toFixed(6),
                        longitude: clickPosition.lng.toFixed(6)
                    })
                });
                if (!response.ok){
                    throw new Error('Network response was not ok')
                }
                const data = await response.json();
                console.log('Response data:', data)
                setSunTimes({
                    sunsetTerrain: data.sunset_dem,
                    sunsetHorizon: data.sunset_globe,
                    sunriseHorizon: data.sunrise_globe,
                    sunriseTerrain: data.sunrise_dem,
                    // sunsetCloud: data.sunset_cloud
                });
            } catch (error) {
                console.log('Error bei Sonnen-API-Abfrage:', error);
            }
        };
        if (clickPosition) {
            fetchSunTimes();
        }
    };

    return (
        <div className="App">
            <MapContainer
                className="map-container"
                center={[47.535, 7.642]}
                zoom={8}
                scrollWheelZoom={true}
                zoomControl={false}
                maxBounds={bounds}
                maxBoundsViscosity={1.0}
                minZoom={8}
            >
                {activeItems[2] && (
                    <div style={{ position: 'absolute', height: 'auto', width: '100%', zIndex: 1150 }}>
                        <Symbologie />
                    </div>
                )}

                {activeItems[0] && (
                    <WMSTileLayer
                        key={`StarryEyes:hillshade_${formatSliderValue(sliderValue)}`}
                        layers={`StarryEyes:hillshade_${formatSliderValue(sliderValue)}`}
                        url="http://localhost:8080/geoserver/StarryEyes/wms"
                        format="image/png"
                        transparent={true}
                        tileSize={512}
                        styles="Schatten"
                    />
                )}

                {activeItems[1] && (
                    <WMSTileLayer
                        layers="StarryEyes:Lichtverschmutzung_CH_2024"
                        url="http://localhost:8080/geoserver/StarryEyes/wms"
                        format="image/png"
                        transparent={true}
                        tileSize={512}
                        styles="Lichtverschmutzung"
                    />              
                )} 

                <TileLayer
                    transparent={true}
                    attribution='&copy; <a href="https://www.geo.admin.ch/">swisstopo</a>'
                    url="https://wmts.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe/default/current/3857/{z}/{x}/{y}.jpeg"
                    // url="https://wmts.geo.admin.ch/1.0.0/ch.swisstopo.swisstlm3d-karte-farbe.3d/default/current/3857/{z}/{x}/{y}.jpeg"
                />

                <MapClickHandler setClickPosition={setClickPosition} />

                {clickPosition && (
                    <Marker position={clickPosition} icon={MarkerIcon} eventHandlers={{ click: handleMarkerClick }}>
                        <Popup className="popupCustom" borderRadius={0}>
                            <PopupContent
                            sunTimes={sunTimes} 
                            clickPosition={clickPosition}
                            setShowSuccessSnackbar={setShowSuccessSnackbar}/>
                        </Popup>
                    </Marker>
                )}

                <ZoomControl position="bottomleft" />
            </MapContainer>
            <div style={{ position: 'absolute', bottom: '2px', right: 0, transform: 'translateY(-50%)', zIndex: 1100 }}>
                <IconButton
                    onClick={handleMoonOpen}
                    sx={{
                      padding: 0.5,
                      marginRight: 2,
                      ...(MoonOpen && { display: 'none' }),
                      backgroundColor: "#334854",
                      '&:hover': {
                        backgroundColor: "#667784",
                        cursor: "pointer"}
                    }}>
                    <img
                        src={MondMenu}
                        alt="Logo"
                        style={{ width: '50px', height: 'auto' }}
                    />
                </IconButton>
            </div>
            <div style={{ position: 'absolute', top: '15px', left: '30px', zIndex: 1200 }}>
                <IconButton
                color="black"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                mr: 2,
                ...(MenuOpen && { display: 'none' }),
                color: "white",
                backgroundColor: "#334854",
                borderRadius: "1px",
                '&:hover': {
                    backgroundColor: "#667784"}
                }}
            >
                <MenuIcon/>
            </IconButton>     
            </div>
            <div style={{ position: 'absolute', top: '15px', right: '30px', zIndex: 1200 }}>
                <img
                src={Logo}
                alt="Logo"
                style={{ width: '150px', height: '50px' }}
                />
            </div>
            <SuccessSnackbar open={showSuccessSnackbar} /> 
        </div>
    );
}

export default App;