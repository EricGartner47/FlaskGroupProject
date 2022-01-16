
import React from 'react';
import LogoutButton from '../auth/LogoutButton';
import ProfileButton from './ProfileButton';
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
            <ProfileButton />
        </nav>
    );
}

export default UserBar;
