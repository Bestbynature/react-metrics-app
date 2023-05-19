import React from 'react';
import { MdOutlineArrowBackIosNew as Larr } from 'react-icons/md';
import { FaMicrophone as Mic } from 'react-icons/fa';
import { GoGear as Gear } from 'react-icons/go';

const Header = () => (
  <div className="header">
    <Larr />
    <h3>2015</h3>
    <p>most views</p>
    <Mic />
    <Gear />

  </div>
);

export default Header;
