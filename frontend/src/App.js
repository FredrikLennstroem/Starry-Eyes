import './App.css';
import React, { useState } from 'react';
import MenuDrawer from './Drawer/MenuDrawer.js';
import Map from './map.js';
import MoonDrawer from './Drawer/MoonDrawer.js';

function roundToQuarterHour(date) {
  const quarterHour = 15 * 60 * 1000;
  return new Date(Math.ceil(date.getTime() / quarterHour) * quarterHour);
}

function App() {
  const [activeItems, setActiveItems] = useState([false, false, false]);
  const [MenuOpen, setMenuOpen] = useState(false);
  const [sliderValue, setSliderValue] = useState(() => {
    const now = roundToQuarterHour(new Date());
    const hours = now.getHours();
    const minutes = now.getMinutes();
    return hours * 60 + minutes;
  });

  return (
      <div className="App">
        <div className="content">
              <div>
                <Map 
                  activeItems={activeItems} 
                  setActiveItems={setActiveItems} 
                  sliderValue={sliderValue} 
                  setSliderValue={setSliderValue}
                  MenuOpen={MenuOpen}
                  setMenuOpen={setMenuOpen}
                />
                <MenuDrawer 
                  activeItems={activeItems} 
                  setActiveItems={setActiveItems} 
                  sliderValue={sliderValue} 
                  setSliderValue={setSliderValue}
                  MenuOpen={MenuOpen}
                  setMenuOpen={setMenuOpen}
                />
                <MoonDrawer/>
              </div>
        </div>
      </div>
  );
}

export default App;