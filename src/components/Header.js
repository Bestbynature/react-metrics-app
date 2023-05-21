import React from 'react';
import { MdOutlineArrowBackIosNew as Larr } from 'react-icons/md';
import { FaMicrophone as Mic } from 'react-icons/fa';
import { GoGear as Gear } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const backHandler = () => {
    navigate('/', { replace: true });
  };

  return (
    <div className="header">
      <Larr onClick={backHandler} />
      <h3>2015</h3>
      <p>most views</p>
      <Mic />
      <Gear />

    </div>
  );
};

export default Header;
