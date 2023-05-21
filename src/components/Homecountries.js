import React from 'react';
import { PropTypes } from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { BsArrowRightCircle as Arr } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCountry } from '../redux/details/detailsSlice';

const Homecountries = ({ country, load }) => {
  const dispatch = useDispatch();
  const { Area, Capital, Population } = load || {};
  const sent = [country, load];

  return (
    <Link to={`/country/${country.toLowerCase()}`}>
      <button
        type="button"
        key={uuidv4()}
        onClick={() => dispatch(setCountry(sent))}
      >
        <div>
          <p>
            Area:&nbsp;
            {Area}
          </p>
          <p>
            Capital:&nbsp;
            {Capital}
          </p>
          <p>
            Population:&nbsp;
            {Population}
          </p>
          <img src={load['Official Flag']} alt="Official Flag" />
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
  load: PropTypes.instanceOf(Object),
  country: PropTypes.string.isRequired,
};

Homecountries.defaultProps = {
  load: {},
};

export default Homecountries;
