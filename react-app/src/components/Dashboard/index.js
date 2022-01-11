
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { loadTasks } from '../../store/tasks';
import { loadLists } from '../../store/lists';
import UserBar from '../UserBar';
import TaskPanel from '../TaskPanel'
import ListBar from '../ListBar';
import ListSummary from '../ListSummary';
import './Dashboard.css'

const Dashboard = () => {
    const user = useSelector(state => state.session.user);
    const lists = useSelector(state => state.lists)
    const { search } = window.location;
    const query = new URLSearchParams(search).get('s');
    const [searchQuery, setSearchQuery] = useState(query || '');

    if (user) {
        return (
            <div id="dashboard">
                <UserBar
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}/>
                <div id="dashboard-content">
                    <ListBar />
                    <TaskPanel query={searchQuery}/>
                    <ListSummary lists={lists}/>
                </div>
            </div>
        )
    }

    else return (
        <Redirect to="/login" />
    );
}

export default Dashboard;
