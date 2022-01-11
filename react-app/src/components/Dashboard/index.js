
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { loadTasks } from '../../store/tasks';
import './Dashboard.css'

const Dashboard = () => {
    const user = useSelector(state => state.session.user);
    const tasks = useSelector(state => state.tasks)
    const userTasks = Object.values(tasks)
    const dispatch = useDispatch();
    useEffect(() => {
        if (user) {
            dispatch(loadTasks(user));
        }
        else return;
    }, [dispatch, user]);

    if (user) {
        return (
            <div>
                <h1>{user.first_name}'s tasks</h1>
                {userTasks.map(task => {
                    return (
                        <li key={task.id}>
                            {task.name} - {task.notes}
                        </li>
                    )
                })}
            </div>
        )
    }

    else return (
        <Redirect to="/login" />
    );
}

export default Dashboard;
