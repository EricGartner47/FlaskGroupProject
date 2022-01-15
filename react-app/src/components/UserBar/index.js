
import React from 'react';
import LogoutButton from '../auth/LogoutButton';
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
            <div id="userbar-logout">
                <LogoutButton />
            </div>
        </nav>
    );
}

export default UserBar;
