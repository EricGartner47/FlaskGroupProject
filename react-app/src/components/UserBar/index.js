
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import DemoLoginButton from '../DemoLoginButton';
import './UserBar.css'

const UserBar = () => {
    return (
        <nav id="userbar">
            <div id="search-bar">
                
            </div>
            <div>
                <LogoutButton />
            </div>
        </nav>
    );
}

export default UserBar;
