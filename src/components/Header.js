import React from 'react';
import { MdOutlineArrowBackIosNew as Larr } from 'react-icons/md';
import { FaMicrophone as Mic } from 'react-icons/fa';
import { GoGear as Gear } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setHeader } from '../redux/details/detailsSlice';

const Header = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { header } = useSelector((store) => store.details);

  const { first, second } = header;

  const backHandler = () => {
    dispatch(setHeader());
    navigate('/', { replace: true });
  };

  return (
    <div className="header">
      <div><Larr onClick={backHandler} data-testid="back-button" /></div>
      <h3>{first}</h3>
      <p>{second}</p>
      <Mic data-testid="mirophone-icon" />
      <Gear data-testid="gear-icon" />

    </div>
  );
};

export default Header;
