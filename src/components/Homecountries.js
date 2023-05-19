import React from 'react';
import { PropTypes } from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { BsArrowRightCircle as Arr } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCountry } from '../redux/italy/italySlice';

const Homecountries = ({ country, data }) => {
  const dispatch = useDispatch();
  const { co, no, pollution } = data || {};
  // console.log(data);
  const sent = [country, data];

  return (
    <Link to={`/country/${country.toLowerCase()}`}>
      <button
        type="button"
        key={uuidv4()}
        onClick={() => dispatch(setCountry(sent))}
      >
        <div>
          <p>
            CO level:
            {co}
          </p>
          <p>
            NO level:
            {no}
          </p>
          <p>
            Pollution level:
            {pollution}
          </p>
        </div>
        <div>
          <Arr />
          {country}
        </div>
      </button>
    </Link>
  );
};

Homecountries.propTypes = {
  data: PropTypes.instanceOf(Object),
  country: PropTypes.string.isRequired,
};

Homecountries.defaultProps = {
  data: [],
};

export default Homecountries;
