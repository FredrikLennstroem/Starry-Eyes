// App.js ist die Elternkomponente der App
// Dieser Code wird in index.js importiert

import './App.css';
import React, { useState } from 'react';
import MenuDrawer from './Drawer/MenuDrawer.js';
import Map from './map.js';
import MoonDrawer from './Drawer/MoonDrawer.js';


// Funktion rundet die aktuelle Uhrzeit auf Viertelstunden
function roundToQuarterHour(date) {
  const quarterHour = 15 * 60 * 1000;
  return new Date(Math.ceil(date.getTime() / quarterHour) * quarterHour);
}

function App() {
  const [activeItems, setActiveItems] = useState([false, false, false]); // Variablen der drei Checkboxen im Layermanager
  const [LayerMenuOpen, setLayerMenuOpen] = useState(false); // Statusvariable zum Öffnen des Layermanagers
  const [sliderValue, setSliderValue] = useState(() => {
    const now = roundToQuarterHour(new Date());
    const hours = now.getHours();
    const minutes = now.getMinutes();
    return hours * 60 + minutes;
  }); // Formatiert die akutelle Uhrzeit um den Default-Sliderwert zu definieren

  return (
      <div className="App">
        <div className="content">
              <div>
                <Map 
                  activeItems={activeItems} 
                  setActiveItems={setActiveItems} 
                  sliderValue={sliderValue} 
                  setSliderValue={setSliderValue}
                  LayerMenuOpen={LayerMenuOpen}
                  setLayerMenuOpen={setLayerMenuOpen}
                />
                <MenuDrawer 
                  activeItems={activeItems} 
                  setActiveItems={setActiveItems} 
                  sliderValue={sliderValue} 
                  setSliderValue={setSliderValue}
                  LayerMenuOpen={LayerMenuOpen}
                  setLayerMenuOpen={setLayerMenuOpen}
                />
                <MoonDrawer/>
              </div>
        </div>
      </div>
  );
}

export default App;