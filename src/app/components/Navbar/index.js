import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

import { NavbarData } from './NavbarData';

export default function Navbar() {
  return(
    <>
    <div>
      <nav className='nav-menu'>
        <ul className="nav-menu-items">
          {NavbarData.map((item, index) => {
            return(
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  <div className='icon'>
                    {item.icon}
                    <span>{item.title}</span>
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
    </>
  );
}