
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { loadTasks } from '../../store/tasks';
import UserBar from '../UserBar';
import './TaskPanel.css'

const Dashboard = () => {
    const { search } = window.location
    const query = new URLSearchParams(search).get('s')
    const user = useSelector(state => state.session.user);
    const tasks = useSelector(state => state.tasks)
    const userTasks = Object.values(tasks)
    const filteredTasks = filterTasks(userTasks, query)
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
                {filteredTasks.map(task => {
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

const filterTasks = (tasks, query) => {
    if (!query) {
        return tasks;
    }

    return tasks.filter((task)=> {
        const taskName = task.name.toLowerCase();
        return taskName.includes(query)
    })

}

export default Dashboard;
