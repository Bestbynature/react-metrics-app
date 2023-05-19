import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { fetchHomeData, fetchHomeLatLong } from '../redux/home/homeSlice';
import Homecountries from './Homecountries';

const Home = () => {
  const countries = ['CZECK REPUBLIC', 'ITALY', 'GERMANY', 'POLAND', 'SPAIN', 'UNITED KINGDOM', 'NIGERIA', 'GHANA'];

  const dispatch = useDispatch();

  const { data1, data2 } = useSelector((store) => store.home);

  useEffect(() => {
    if (data1.length > 0) {
      dispatch(fetchHomeData(data1));
    } else {
      dispatch(fetchHomeLatLong());
    }
  }, [dispatch, data1]);

  return (
    <>
      <div className="home1">
        <div className="continent">&nbsp;</div>
        <div className="continent">EUROPE</div>
      </div>
      <div className="home2">
        STATS BY COUNTRY
      </div>
      {data2 && (
      <div className="home3">
        {countries.map((country, i) => {
          const data = data2[i];
          return <Homecountries key={uuidv4()} country={country} index={i} data={data} />;
        })}
      </div>
      )}
    </>
  );
};

export default Home;
