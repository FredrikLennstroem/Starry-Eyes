import { MapContainer, TileLayer, Marker, Popup, ZoomControl} from "react-leaflet";
import './App.css';

function App() {
    const position = [51.505, -0.09];
    return (
        <div className="App">
            <MapContainer
                className="map-container"
                center={position}
                zoom={13}
                scrollWheelZoom={true}
                zoomControl={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">
                    OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
                <ZoomControl position="bottomleft" />
            </MapContainer>
        </div>
    );
}

export default App;
