import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import Details from './components/Details';
import Notfound from './components/Notfound';
import { countries } from './redux/home/homeSlice';
import './App.css';

function ScrollToTop() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {countries.map((item) => (
            <Route key={item} path={`/country/${item}`} element={<Details />} />
          ))}
          <Route path="*" element={<Notfound />} />
        </Route>
      </Routes>
      <ScrollToTop />
    </div>
  );
}

export default App;
