
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css'

const NavBar = () => {
  return (
    <nav>
      <div id="logo">
        <NavLink to='/' exact={true} activeClassName='active'>
          Home
        </NavLink>
      </div>
      <ul>
        <li>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Log in
          </NavLink>
        </li>
        <li>
          <NavLink id="signup" to='/sign-up' exact={true} activeClassName='active'>
            Sign up for free
          </NavLink>
        </li>
        {/* <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li>
        <li>
          <LogoutButton />
        </li> */}
      </ul>
    </nav>
  );
}

export default NavBar;
