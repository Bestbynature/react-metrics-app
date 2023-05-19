import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItalyLatLong, citiesall } from '../redux/italy/italySlice';

const Italy = () => {
  const dispatch = useDispatch();

  const { citydata, country, countryPollution } = useSelector((store) => store.italy);

  const loaded = country.toLowerCase().replace(/ /g, '');
  const cities = citiesall[loaded];

  const { co, no, pollution } = countryPollution || [];

  useEffect(() => {
    dispatch(fetchItalyLatLong(country));
  }, []);

  return (
    <>
      <div className="home1">
        <div className="continent">
          co level is
          {' '}
          {co}
          <br />
          no level is
          {' '}
          {no}
          <br />
          pollution level is
          {' '}
          {pollution}
        </div>
        <div className="continent">{country}</div>
      </div>
      <div className="home2">
        <p>CITY/TOWN BREAKDOWN - 2015</p>
      </div>
      <div className="home4">
        {cities.map((city, i) => {
          const data = citydata[i];
          const { co } = data || {};
          return (
            <div className="home5" key={city}>
              <h3>{city}</h3>
              <p>
                co in&nbsp;
                {city}
                :&nbsp;
                {co}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Italy;
