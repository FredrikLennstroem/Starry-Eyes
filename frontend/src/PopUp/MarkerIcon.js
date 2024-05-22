// Definitin des Markericons
// Dieses wird im MenuDrawer.js und im map.js verwendet

import L from 'leaflet';
import markerIconSVG from '../Images/marker.svg';

const customIcon = L.icon({
  iconUrl: markerIconSVG,
  iconSize: [46, 46],
  iconAnchor: [23, 46],
  popupAnchor: [0, -46]
});

export default customIcon;