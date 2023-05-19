import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItalyData, fetchItalyLatLong, cities } from '../redux/italy/italySlice';

const Italy = () => {
  const dispatch = useDispatch();

  const {
    data1, data2, country, countryPollution,
  } = useSelector((store) => store.italy);

  const { co, no, pollution } = countryPollution || [];
  useEffect(() => {
    if (data1.length > 0) {
      dispatch(fetchItalyData(data1));
    } else {
      dispatch(fetchItalyLatLong());
    }
  }, [dispatch, data1]);

  // console.log(data2, cities);

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
          const data = data2[i];
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
