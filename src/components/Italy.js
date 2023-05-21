import React from 'react';
import { useSelector } from 'react-redux';
import { v4 } from 'uuid';

const Italy = () => {
  const { countryData, country } = useSelector((store) => store.italy);

  const { Area, Population, Capital } = countryData || {};

  const properties = Object.entries(countryData);

  return (
    <>
      <div className="home1">
        <div className="continent">
          Area is &nbsp;
          {Area}
          <br />
          Population is &nbsp;
          {Population}
          <br />
          Capital is &nbsp;
          {Capital}
        </div>
        <div className="continent">{country}</div>
      </div>
      <div className="home2">
        <p>COUNTRY BREAKDOWN - 2023</p>
      </div>
      <div className="home4">
        {properties.map(([property, value]) => {
          if (property === 'Map' && typeof value === 'string' && value.includes('goo.gl')) {
            return (
              <div className="home5" key={v4()}>
                <h3>
                  <a href={value} target="_blank" rel="noopener noreferrer">
                    Open Google Maps
                  </a>
                </h3>
              </div>
            );
          }
          if (typeof value === 'string' && value.includes('http')) {
            return (
              <div className="home5" key={v4()}>
                <h3>{property}</h3>
                <div><img src={value} alt={property} /></div>
              </div>
            );
          }
          if (typeof value === 'boolean') {
            return (
              <div className="home5" key={v4()}>
                <h3>{property}</h3>
                <div>{value === true ? 'Yes' : 'No'}</div>
              </div>
            );
          }

          return (
            <div className="home5" key={v4()}>
              <h3>{property}</h3>
              <div>{value}</div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Italy;
