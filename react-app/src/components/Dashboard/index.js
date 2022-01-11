
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { loadTasks } from '../../store/tasks';
import UserBar from '../UserBar';
import TaskPanel from '../TaskPanel'
import './Dashboard.css'

const Dashboard = () => {
    const user = useSelector(state => state.session.user);
   
    if (user) {
        return (
            <div id="dashboard">
                <UserBar />
                <TaskPanel />
            </div>
        )
    }

    else return (
        <Redirect to="/login" />
    );
}

export default Dashboard;
