import {MapContainer, TileLayer, Marker, Popup, ZoomControl, useMapEvents } from "react-leaflet";
import './App.css';
import React, {useState} from 'react';

function MapClickHandler({ setClickPosition }) {
    useMapEvents({
        click(e) {
            setClickPosition(e.latlng);
        }
    });

    return null;
}

function App() {
    const [clickPosition, setClickPosition] = useState([47.535, 7.642]);

    const bounds = [
        [45.659168946713827, 5.8358140744676303], // Südwestliche Grenze
        [47.869910020393519, 10.979311848153316]  // Nordöstliche Grenze
    ];
    
    return (
        <div className="App">
            <MapContainer
                className="map-container"
                center={[47.535, 7.642]}
                zoom={15}
                scrollWheelZoom={true}
                zoomControl={false}
                maxBounds={bounds}
                maxBoundsViscosity={1.0}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">
                    OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* <TileLayer
                transparent={true}
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://wmts.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe-winter/default/current/3857/{z}/{x}/{y}.jpeg"
                /> */}

                <MapClickHandler setClickPosition={setClickPosition} />

                {clickPosition && (
                    <Marker position={clickPosition}>
                        <Popup>Latitude: {clickPosition.lat}, Longitude: {clickPosition.lng}</Popup>
                    </Marker>
                )}

                <ZoomControl position="bottomleft" />
            </MapContainer>
        </div>
    );
}

export default App;

// https://leafletjs.com/reference.html#latlngbounds und dort folgende Funktionen für Border: maxBoundsViscosity, LatLngBounds
// 5.8358140744676303 45.659168946713827 10.979311848153316 47.869910020393519