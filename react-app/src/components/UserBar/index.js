
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from '../auth/LogoutButton';
import DemoLoginButton from '../DemoLoginButton';
import Search from '../Search';
import './UserBar.css'

const UserBar = ({ searchQuery, setSearchQuery }) => {

    return (
        <nav id="userbar">
            <div id="search-bar">
                <Search 
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}/>
            </div>
            <div>
                <LogoutButton />
            </div>
        </nav>
    );
}

export default UserBar;
