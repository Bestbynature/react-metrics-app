import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import Details from './components/Details';
import Notfound from './components/Notfound';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/country/italy" element={<Details />} />
          <Route path="/country/germany" element={<Details />} />
          <Route path="/country/poland" element={<Details />} />
          <Route path="/country/nigeria" element={<Details />} />
          <Route path="/country/ghana" element={<Details />} />
          <Route path="/country/spain" element={<Details />} />
          <Route path="/country/united kingdom" element={<Details />} />
          <Route path="/country/bolivia" element={<Details />} />
          <Route path="*" element={<Notfound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
