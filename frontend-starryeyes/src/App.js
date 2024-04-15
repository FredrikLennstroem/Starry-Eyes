import './App.css';
import React, { useState } from 'react';
import PersistentDrawerLeft from './drawer.js';
import Map from './map.js';
import Moonbox from './Moonbox';

function App() {
  const [activeItems, setActiveItems] = useState([false, false, false]);
  const [sliderValue, setSliderValue] = useState(50);
  const [MoonOpen, setMoonOpen] = React.useState(true);

  return (
    <div className="App">
      <div className="content">
        <Map 
          activeItems={activeItems} 
          setActiveItems={setActiveItems} 
          sliderValue={sliderValue} 
          setSliderValue={setSliderValue}
          MoonOpen={MoonOpen}
          setMoonOpen={setMoonOpen}
        />
        <PersistentDrawerLeft 
          activeItems={activeItems} 
          setActiveItems={setActiveItems} 
          sliderValue={sliderValue} 
          setSliderValue={setSliderValue}
        />
        <Moonbox
          MoonOpen={MoonOpen}
          setMoonOpen={setMoonOpen}
        />
      </div>
    </div>
  );
}

export default App;