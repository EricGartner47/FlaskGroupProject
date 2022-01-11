
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { loadTasks } from '../../store/tasks';
import UserBar from '../UserBar';
import TaskPanel from '../TaskPanel'
import './Dashboard.css'

const Dashboard = () => {
    const user = useSelector(state => state.session.user);
    const { search } = window.location;
    const query = new URLSearchParams(search).get('s');
    const [searchQuery, setSearchQuery] = useState(query || '');

    if (user) {
        return (
            <div id="dashboard">
                <UserBar 
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}/>
                <TaskPanel query={searchQuery}/>
            </div>
        )
    }

    else return (
        <Redirect to="/login" />
    );
}

export default Dashboard;
