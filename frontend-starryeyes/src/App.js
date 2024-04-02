import './App.css';
import React, { useState } from 'react';
import PersistentDrawerLeft from './drawer.js';
import Map from './map.js'

function App() {
  const [activeItems, setActiveItems] = useState([false, false, false]);
  const [sliderValue, setSliderValue] = useState(50);

  return (
    <div className="App">
      <div className="content">
        <Map 
          activeItems={activeItems} 
          setActiveItems={setActiveItems} 
          sliderValue={sliderValue} 
          setSliderValue={setSliderValue}
        />
        <PersistentDrawerLeft 
          activeItems={activeItems} 
          setActiveItems={setActiveItems} 
          sliderValue={sliderValue} 
          setSliderValue={setSliderValue}
        />
      </div>
    </div>
  );
}

export default App;