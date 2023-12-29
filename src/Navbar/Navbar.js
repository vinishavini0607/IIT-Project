import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="menu">
      <ul className="list">
        <li className="items"> Home </li>
        <li className="items"> Materials
        <ul className='submenu'>
        <li>
        <Link to="/materialDetails">MaterialDetails</Link> </li>
      <li><Link to="/materialList">MaterialList</Link></li>
       </ul>
       </li>
          
      </ul>
    </nav>
  );
};

export default Navbar;
