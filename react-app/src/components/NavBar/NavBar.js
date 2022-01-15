
import React from 'react';
import { NavLink } from 'react-router-dom';
import DemoLoginButton from '../DemoLoginButton';
import './NavBar.css'

const NavBar = () => {
  return (
    <nav id="homepage-nav">
      <div id="ymtl-container-home">
        <NavLink to='/' exact={true} activeClassName='active' className="ymtl-logo">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Notepad_icon.svg/2048px-Notepad_icon.svg.png" alt="" id="notepad"></img>
            <span>you made<br></br>the list</span>
        </NavLink>
      </div>
      <ul>
        <li>
          <DemoLoginButton />
        </li>
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
