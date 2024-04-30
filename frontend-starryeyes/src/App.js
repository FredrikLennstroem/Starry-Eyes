import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import PersistentDrawerLeft from './Drawer/MenuDrawer.js';
import Map from './Map.js';
import Moonbox from './Drawer/MoonDrawer.js';

function roundToQuarterHour(date) {
  const quarterHour = 15 * 60 * 1000; // 15 Minuten in Millisekunden
  return new Date(Math.ceil(date.getTime() / quarterHour) * quarterHour);
}

function App() {
  const [activeItems, setActiveItems] = useState([false, false, false]);
  const [MoonOpen, setMoonOpen] = useState(true);
  const [MenuOpen, setMenuOpen] = useState(false);
  const [sliderValue, setSliderValue] = useState(() => {
    const now = roundToQuarterHour(new Date());
    const hours = now.getHours();
    const minutes = now.getMinutes();
    return hours * 60 + minutes;
  });

  return (
    <Router>
      <div className="App">
        <div className="content">
              <div>
                <Map 
                  activeItems={activeItems} 
                  setActiveItems={setActiveItems} 
                  sliderValue={sliderValue} 
                  setSliderValue={setSliderValue}
                  MoonOpen={MoonOpen}
                  setMoonOpen={setMoonOpen}
                  MenuOpen={MenuOpen}
                  setMenuOpen={setMenuOpen}
                />
                <PersistentDrawerLeft 
                  activeItems={activeItems} 
                  setActiveItems={setActiveItems} 
                  sliderValue={sliderValue} 
                  setSliderValue={setSliderValue}
                  MenuOpen={MenuOpen}
                  setMenuOpen={setMenuOpen}
                />
                <Moonbox
                  MoonOpen={MoonOpen}
                  setMoonOpen={setMoonOpen}
                />
              </div>
        </div>
      </div>
    </Router>
  );
}

export default App;