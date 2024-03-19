import './App.css';
import React from 'react';
import PersistentDrawerLeft from './drawer.js';
import Map from './map.js'

function App() {
  return (
    <div className="App">
      <div className="content">
        <Map/>
        <PersistentDrawerLeft/>
      </div>
    </div>
  );
}

export default App;

