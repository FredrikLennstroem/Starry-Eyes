// Dieser Code beinhaltet alle Kartenelemente der App
// Dieser Code wird in App.js importiert

import {MapContainer, WMSTileLayer, TileLayer, Marker, Popup, ZoomControl, useMapEvents, ScaleControl} from "react-leaflet";
import './App.css';
import {React, useState} from 'react';
import PopupContent from './PopUp/PopupContent.js';
import MarkerIcon from './PopUp/MarkerIcon.js';
import SuccessSnackbar from './SuccessSnackbar.js';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from './Images/StarryEyes_Logo_1.png';
import Symbolerklaerung from "./Symbolerklaerung.js";
import InfoBox from "./InfoBox.js";

// Klicken auf die Karte setzt die Variablen für die Standortkoordinaten & setzt die sunTimes Werte zurück (so werden diese beim PopUp öffnen neu geladen)
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

// Abfragefunktion des aktuellen Zoomlevels der Karte, um Layer abhängig davon darzustellen
function MapZoomHandler({setZoomLevel}) {
    const mapEvents = useMapEvents({
        zoomend: () => {
            setZoomLevel(mapEvents.getZoom());
        },
    });
    return null
}

function App({ activeItems, sliderValue, setLayerMenuOpen, LayerMenuOpen }) {
    const [zoomLevel, setZoomLevel] = useState(9); // Zoomlevel Variable
    const [clickPosition, setClickPosition] = useState({ lat: 46.801, lng: 8.227 }); // Standortkoordinaten Variable
    const [infoClose, setInfoClose] = useState(true); // Statusvariable der InfoBox
    const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false); // Statusvariable der SuccessSnackbar
    const [sunTimes, setSunTimes] = useState({
        sunsetTerrain: 'hh:mm',
        sunsetHorizon: 'hh:mm',
        sunriseHorizon: 'hh:mm',
        sunriseTerrain: 'hh:mm',
        sunsetCloud: '--',
        starCloud: '--'
    }); // Defaultwerte der sunTimes Variable

    const bounds = [
        [44.659168946713827, 4.8358140744676303],
        [48.869910020393519, 11.979311848153316]
    ]; 

    const handleMenuDrawerOpen = () => {
        setLayerMenuOpen(true);
    }; // Öffnet den Layermanager
    
    const formatSliderValue = (value) => {
        const hours = Math.floor(value / 60);
        const minutes = value % 60;
        const formattedMinutes = minutes === 0 ? '0' : minutes.toString().padStart(2, '0');
        return `${hours}_${formattedMinutes}`;
    }; // Formatiert die Werte des Sliders so um, dass die WMS Layers der Schatten-Tiffs richtig abgefragt werden

    // API Schnittstelle zum Backend. Hier werden die Daten geladen, die im PopUp angezeigt werden.
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
            {localStorage.getItem('hideInfo') === 'true' && infoClose && ( // Anzeige der InfoBox mit der Bedingung, dass der Wert von 'hideInfo' im localStorage 'true' ist
                <InfoBox setInfoClose={setInfoClose} />
            )}
            {!activeItems[2] && ( // Anzeige der Kartenelemente, falls die Symbolerklärung (activeItems[2]) nicht eingeschaltet ist
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
                    {activeItems[0] && ( // WMTS Bezug des Schattenlayers
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

                    {activeItems[1] && ( // WMTS Bezug des Lichtverschmutzungslayers
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
                    
                    {(zoomLevel >= 14) && ( // Anzeige der Hintergrundkarte SwissTLM Karte. Ab Zoomlevel 14 im Hintergrund bereits geladen
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
                    {(zoomLevel < 16) && ( // Anzeige der Hintergrundkarte (WMTS) Swisstopo Pixelkarte bis Zoomlevel 16.
                        <TileLayer
                            url="https://wmts.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe/default/current/3857/{z}/{x}/{y}.jpeg"
                            attribution= '&copy; <a href="https://www.swisstopo.ch/copyright">Swisstopo</a>'
                            zIndex={600}
                        />
                    )}

                    {/* Import der beiden oben definierten Funktionen */}
                    <MapZoomHandler setZoomLevel={setZoomLevel} />
                    <MapClickHandler setClickPosition={setClickPosition} setSunTimes={setSunTimes}/>
                    
                    {/* Darstellung des Markers und des PopUps */}
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
            {activeItems[2] && ( // Anzeige der Symbolerklärung, falls diese (activeItems[2]) eingeschaltet ist
                <div style={{ position: 'absolute', height: 'auto', width: '100%', zIndex: 1150 }}>
                    <Symbolerklaerung LayerMenuOpen={LayerMenuOpen}/>
                </div>
            )}

            <div style={{ position: 'absolute', top: '15px', left: '30px', zIndex: 1200 }}> {/* Definition des HamburgerMenus oben links */}
                <IconButton
                title="Menu"
                aria-label="open drawer"
                onClick={handleMenuDrawerOpen}
                edge="start"
                sx={{
                mr: 2,
                ...(LayerMenuOpen && { display: 'none' }),
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

            <div style={{ position: 'absolute', top: '15px', right: '30px', zIndex: 1200 }}> {/* Definition des Logos oben rechts */}
                <img
                src={Logo}
                alt="Logo"
                style={{ width: '150px', height: '50px' }}
                onClick={() => localStorage.setItem('hideInfo', 'true')} // Für Testzwecke wird durch das Klicken auf das Logo im localStorage die 'hideInfo' wieder zurück auf 'true' gesetzt
                />
            </div>
            
            <SuccessSnackbar open={showSuccessSnackbar} /> 
        </div>
    );
}

export default App;