import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Layout from './components/Layout';
import Home from './components/Home';
import Italy from './components/Italy';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/country" element={<Layout />} />
        <Route index element={<Home />} />
        <Route path="/country/italy" element={<Italy />} />
        <Route path="/country/germany" element={<Italy />} />
        <Route path="/country/poland" element={<Italy />} />
        <Route path="/country/nigeria" element={<Italy />} />
        <Route path="/country/ghana" element={<Italy />} />
        <Route path="/country/spain" element={<Italy />} />
        <Route path="/country/united kingdom" element={<Italy />} />
        <Route path="/country/bolivia" element={<Italy />} />
      </Routes>
    </div>
  );
}

export default App;
