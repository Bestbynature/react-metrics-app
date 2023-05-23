import React from 'react';
import { useSelector } from 'react-redux';
import { v4 } from 'uuid';
import { BsArrowRightCircle as Arr } from 'react-icons/bs';

const Details = () => {
  const { countryData, country } = useSelector((store) => store.details);

  const {
    Area, Population, Capital, Name,
  } = countryData || {};

  const properties = Object.entries(countryData);

  return (
    <>
      <div className="home1" data-testid="details">
        <div className="first">
          <p>
            Area is &nbsp;
            {Area}
            sq. km
          </p>
          <hr />
          <p>
            Population is &nbsp;
            {Population}
          </p>
          <hr />
          <p>
            Capital of
            {' '}
            {Name}
            {' '}
            is &nbsp;
            {Capital}
          </p>
        </div>
        <div className="second">{country}</div>
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
                <div>&nbsp;</div>
                <Arr />
              </div>
            );
          }
          if (typeof value === 'string' && value.includes('http')) {
            return (
              <div className="home5" key={v4()}>
                <h3>{property}</h3>
                <div><img src={value} alt={property} title={property} /></div>
                <Arr />
              </div>
            );
          }
          if (typeof value === 'boolean') {
            return (
              <div className="home5" key={v4()}>
                <h3>{property}</h3>
                <div>{value === true ? 'Yes' : 'No'}</div>
                <Arr />
              </div>
            );
          }

          return (
            <div className="home5" key={v4()}>
              <h3>{property}</h3>
              <div>{value}</div>
              <Arr />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Details;
