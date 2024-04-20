import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PersistentDrawerLeft from './Drawer/MenuDrawer.js';
import Map from './map.js';
import Moonbox from './Drawer/MoonDrawer.js';
import Symbologie from './Symbologie.js';

function App() {
  const [activeItems, setActiveItems] = useState([false, false, false]);
  const [sliderValue, setSliderValue] = useState(50);
  const [MoonOpen, setMoonOpen] = React.useState(true);
  const [MenuOpen, setMenuOpen] = React.useState(false);

  return (
    <Router>
      <div className="App">
        <div className="content">
          <Routes>
            <Route path="/symbologie" element={<Symbologie/>}/>
            <Route path="/" element={
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
            } />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;