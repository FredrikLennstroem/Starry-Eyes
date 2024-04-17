import {MapContainer, TileLayer, Marker, Popup, ZoomControl, useMapEvents} from "react-leaflet";
import './App.css';
import React, {useState} from 'react';
import PopupContent from './PopUp/Popup.js';
import MarkerIcon from './PopUp/MarkerIcon.js';
import SuccessSnackbar from './SuccessSnackbar.js';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from './Images/StarryEyes_Logo_1.png';

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
                    <TileLayer
                        transparent={true}
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://wmts.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-grau/default/current/3857/{z}/{x}/{y}.jpeg"
                    />
                )}

                {activeItems[1] && (
                    <TileLayer
                        transparent={true}
                        attribution='&copy; <a href="http://localhost:8080/geoserver/wms">Geoserver</a> contributors'
                        url="http://localhost:8080/geoserver/wms?service=WMS&version=1.1.0&request=GetMap&layers=viirs_npp_202300&styles=&format=image/png&transparent=true&height=512&width=512&srs=EPSG:4326&bbox=5.824999999999994,45.03333333333333,11.10416666666666,48.64583333333333"
                    />
                )}
                
                {activeItems[2] && (
                    <TileLayer
                        transparent={true}
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://wmts.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-grau/default/current/3857/{z}/{x}/{y}.jpeg"
                    />
                )}    

                <TileLayer
                    transparent={true}
                    attribution='&copy; <a href="https://www.geo.admin.ch/">swisstopo</a>'
                    url="https://wmts.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe/default/current/3857/{z}/{x}/{y}.jpeg"
                />

                <MapClickHandler setClickPosition={setClickPosition} />

                {clickPosition && (
                    <Marker position={clickPosition} icon={MarkerIcon}>
                        <Popup>
                            <PopupContent
                            clickPosition={clickPosition}
                            setShowSuccessSnackbar={setShowSuccessSnackbar}/>
                        </Popup>
                    </Marker>
                )}

                <ZoomControl position="bottomleft" />
            </MapContainer>
            <div style={{ position: 'absolute', top: '50%', right: 0, transform: 'translateY(-50%)', zIndex: 1000 }}>
                <ChevronLeftIcon
                    color="white"
                    aria-label="open drawer"
                    onClick={handleMoonOpen}
                    edge="start"
                    sx={{
                      fontSize: 35,
                      mr: 2,
                      ...(MoonOpen && { display: 'none' }),
                      color: "white",
                      backgroundColor: "#334854",
                      borderRadius: "50%",
                      '&:hover': {
                        backgroundColor: "#667784",
                        cursor: "pointer"}
                    }}>
                </ChevronLeftIcon>
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

