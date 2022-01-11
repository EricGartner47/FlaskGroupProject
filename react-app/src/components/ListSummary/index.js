
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import LogoutButton from '../auth/LogoutButton';
import DemoLoginButton from '../DemoLoginButton';
import Search from '../Search';
import { loadListTasks } from '../../store/tasks';
import { loadTasks } from '../../store/tasks';
import './ListSummary.css'

const ListSummary = ({ lists, list }) => {
    const user = useSelector(state => state.session.user);
    const tasks = useSelector(state => state.tasks)
    const userTasks = Object.values(tasks)
    const completedTasks = userTasks.filter(task => task.completed)
    const incompleteTasks = userTasks.filter(task => !task.completed)
    const dispatch = useDispatch();
    useEffect(() => {
        if (user && list) {
            dispatch(loadListTasks(user, list));
        } else if (user) {
            dispatch(loadTasks(user));
        }
        else return;
    }, [dispatch, list, user]);

    return (
        <div id="list-summary">
            <h2>{list? list.name : "All Tasks"}</h2>
            <div>
                { userTasks.length } tasks
            </div>
            <div>
                { completedTasks.length } completed tasks
            </div>
            <div>
                { incompleteTasks.length } incomplete tasks
            </div>
        </div>
    );
}

export default ListSummary;
