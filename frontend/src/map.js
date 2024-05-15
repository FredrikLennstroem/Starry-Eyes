import {MapContainer, WMSTileLayer, TileLayer, Marker, Popup, ZoomControl, useMapEvents, ScaleControl} from "react-leaflet";
import './App.css';
import {React, useState} from 'react';
import PopupContent from './PopUp/Popup.js';
import MarkerIcon from './PopUp/MarkerIcon.js';
import SuccessSnackbar from './SuccessSnackbar.js';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from './Images/StarryEyes_Logo_1.png';
import Symbologie from "./Symbologie.js";
import InfoBox from "./InfoBox.js";

function MapClickHandler({ setClickPosition, setSunTimes }) {
    useMapEvents({
        click(e) {
            setClickPosition(e.latlng);
            setSunTimes({
                sunsetTerrain: 'hh:mm',
                sunsetHorizon: 'hh:mm',
                sunriseHorizon: 'hh:mm',
                sunriseTerrain: 'hh:mm',
                sunsetCloud: '--',
                starCloud: '--'
        })
        }
    });
    return null;
}

function MapZoomHandler({setZoomLevel}) {
    const mapEvents = useMapEvents({
        zoomend: () => {
            setZoomLevel(mapEvents.getZoom());
        },
    });
    return null
}

function App({ activeItems, sliderValue, setMenuOpen, MenuOpen }) {
    const [zoomLevel, setZoomLevel] = useState(9);
    const [clickPosition, setClickPosition] = useState({ lat: 46.801, lng: 8.227 });
    const [infoClose, setInfoClose] = useState(true);

    const bounds = [
        [44.659168946713827, 4.8358140744676303],
        [48.869910020393519, 11.979311848153316]
    ];
    const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);

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
        sunsetCloud: '--',
        starCloud: '--'
    });

    const handleMarkerClick = () => {
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
                setSunTimes({
                    sunsetTerrain: data.sunset_dem,
                    sunsetHorizon: data.sunset_globe,
                    sunriseHorizon: data.sunrise_globe,
                    sunriseTerrain: data.sunrise_dem,
                    sunsetCloud: data.sunset_cloud,
                    starCloud: data.star_cloud
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
            {localStorage.getItem('hideInfo') === 'true' && infoClose && (
                <InfoBox setInfoClose={setInfoClose} />
            )}
            {!activeItems[2] && (
                <MapContainer
                    className="map-container"
                    center={clickPosition}
                    zoom={zoomLevel}
                    scrollWheelZoom={activeItems[2] ? false : true}
                    zoomControl={false}
                    maxBounds={bounds}
                    maxBoundsViscosity={1}
                    minZoom={9}
                    zoomSnap={1}
                >
                    {activeItems[0] && (
                        <WMSTileLayer
                            key={`StarryEyes:hillshade_${formatSliderValue(sliderValue)}`}
                            layers={`StarryEyes:hillshade_${formatSliderValue(sliderValue)}`}
                            url="http://localhost:8080/geoserver/StarryEyes/wms"
                            format="image/png"
                            transparent={true}
                            tileSize={512}
                            styles="Schatten"
                            zIndex={900}
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
                            zIndex={800}
                        />           
                    )} 
                    
                    {(zoomLevel >= 14) && (
                        <WMSTileLayer
                            layers="ch.swisstopo.swisstlm3d-karte-farbe"
                            url="https://wms.geo.admin.ch/?"
                            format="image/png"
                            transparent={false}
                            tileSize={512}
                            attribution= '&copy; <a href="https://www.swisstopo.ch/copyright">Swisstopo</a>'
                            zIndex={500}
                        />
                    )}
                    {(zoomLevel < 16) && (
                        <TileLayer
                            url="https://wmts.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe/default/current/3857/{z}/{x}/{y}.jpeg"
                            attribution= '&copy; <a href="https://www.swisstopo.ch/copyright">Swisstopo</a>'
                            zIndex={600}
                        />
                    )}

                    <MapZoomHandler setZoomLevel={setZoomLevel} />
                    <MapClickHandler setClickPosition={setClickPosition} setSunTimes={setSunTimes}/>

                    {clickPosition && (
                        <Marker position={clickPosition} icon={MarkerIcon} eventHandlers={{ click: handleMarkerClick }}>
                            <Popup className="popupCustom" borderRadius={0} autoPan={false}>
                                <PopupContent
                                sunTimes={sunTimes} 
                                clickPosition={clickPosition}
                                setShowSuccessSnackbar={setShowSuccessSnackbar}/>
                            </Popup>
                        </Marker>
                    )}
                
                    <ScaleControl imperial={false} maxWidth={130}/>
                    <ZoomControl position="bottomleft"/>
                </MapContainer>
            )}
            {activeItems[2] && (
                <div style={{ position: 'absolute', height: 'auto', width: '100%', zIndex: 1150 }}>
                    <Symbologie MenuOpen={MenuOpen}/>
                </div>
            )}
            <div style={{ position: 'absolute', top: '15px', left: '30px', zIndex: 1200 }}>
                <IconButton
                title="Menu"
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
                onClick={() => localStorage.setItem('hideInfo', 'true')} //Easteregg um den Infobalken wieder sichtbar zu schalten
                />
            </div>
            
            <SuccessSnackbar open={showSuccessSnackbar} /> 
        </div>
    );
}

export default App;