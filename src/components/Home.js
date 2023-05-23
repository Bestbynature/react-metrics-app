import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { fetchHomeData, countries } from '../redux/home/homeSlice';
import Homecountries from './Homecountries';

const Home = () => {
  const dispatch = useDispatch();

  const { data } = useSelector((store) => store.home);
  useEffect(() => {
    dispatch(fetchHomeData());
  }, [dispatch]);

  return (
    <>
      <div className="home1" data-testid="home">
        <div className="home-logo">
          <div className="filter">&nbsp;</div>
        </div>
        <div className="continent">MEMBER NATIONS</div>
      </div>
      <div className="home2">
        <p>STATS BY COUNTRY</p>
      </div>
      <div className="home3">
        {countries.map((country, i) => {
          const load = data[i];
          return <Homecountries key={uuidv4()} country={country} load={load} />;
        })}
      </div>
    </>
  );
};

export default Home;
