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

    const handleMarkerClick = () => {
        console.log("Popup geöffnet");
    };

    const formatSliderValue = (value) => {
        const hours = Math.floor(value / 60);
        const minutes = value % 60;
        console.log(`${hours}_${minutes.toString().padStart(2, '0')}`);
        return `${hours}_${minutes.toString().padStart(2, '0')}`;
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

                {activeItems[0] && (
                    <WMSTileLayer
                        key={`StarryEyes:hillshade_${formatSliderValue(sliderValue)}`}
                        layers={`StarryEyes:hillshade_${formatSliderValue(sliderValue)}`}
                        url="http://localhost:8080/geoserver/StarryEyes/wms"
                        format="image/png"
                        transparent={true}
                        tileSize={512}
                    />
                )}

                {activeItems[1] && (
                    <WMSTileLayer
                        layers="StarryEyes:Lichtverschmutzung_CH_2024"
                        url="http://localhost:8080/geoserver/StarryEyes/wms"
                        format="image/png"
                        transparent={true}
                        tileSize={512}
                        styles="Lightpollution"
                    />              
                )}

                {activeItems[2] && (
                    <WMSTileLayer
                        layers="testuebung:kantone"
                        url="http://localhost:8080/geoserver/testuebung/wms"
                        format="image/png"
                        transparent={true}
                        tileSize={512}
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
                            clickPosition={clickPosition}
                            setShowSuccessSnackbar={setShowSuccessSnackbar}/>
                        </Popup>
                    </Marker>
                )}

                <ZoomControl position="bottomleft" />
            </MapContainer>
            <div style={{ position: 'absolute', bottom: '2px', right: 0, transform: 'translateY(-50%)', zIndex: 1000 }}>
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
            <div style={{ position: 'absolute', top: '15px', left: '30px', zIndex: 1000 }}>
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
            <div style={{ position: 'absolute', top: '15px', right: '30px', zIndex: 1000 }}>
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