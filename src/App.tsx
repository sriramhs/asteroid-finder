import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import AsteroidSearch from './AsteroidSearch';
import AsteroidInfo from './AsteroidInfo';



function App() {
  return (
    <Router>
    
    <Routes>
      <Route path="/" element={<AsteroidSearch />} />
      <Route path="/asteroid/:asteroidId" element={<AsteroidInfo />} />
    </Routes>

</Router>
  );
}

export default App;
