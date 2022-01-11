
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from '../auth/LogoutButton';
import DemoLoginButton from '../DemoLoginButton';
import Search from '../Search';
import './UserBar.css'

const UserBar = () => {
    
    const user = useSelector(state => state.session.user);
    const tasks = useSelector(state => state.tasks)
    const userTasks = Object.values(tasks)

    return (
        <nav id="userbar">
            <div id="search-bar">
                <Search />
                {/* <ul>
                    {userTasks.map((task) => (
                        <li key={task.id}>{task.name}</li>
                    ))}
                </ul> */}
            </div>
            <div>
                <LogoutButton />
            </div>
        </nav>
    );
}

export default UserBar;
