import {MapContainer, TileLayer, Marker, Popup, ZoomControl, useMapEvents} from "react-leaflet";
import './App.css';
import React, {useState} from 'react';
import PopupContent from './Popup.js';
import MarkerIcon from './MarkerIcon';
import SuccessSnackbar from './SuccessSnackbar';

function MapClickHandler({ setClickPosition }) {
    useMapEvents({
        click(e) {
            setClickPosition(e.latlng);
        }
    });

    return null;
}

function App({ activeItems, sliderValue }) {
    const [clickPosition, setClickPosition] = useState([47.535, 7.642]);
    const bounds = [
        [45.659168946713827, 5.8358140744676303], // Südwestliche Grenze
        [47.869910020393519, 10.979311848153316]  // Nordöstliche Grenze
    ];
    const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false); // Anzeige für erfolgreiches abonnieren

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
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://wmts.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-grau/default/current/3857/{z}/{x}/{y}.jpeg"
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
            <SuccessSnackbar open={showSuccessSnackbar} /> 
        </div>
    );
}

export default App;

