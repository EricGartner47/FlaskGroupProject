
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { loadTasks, createTask } from '../../store/tasks';
import UserBar from '../UserBar';
import './TaskPanel.css'

const filterTasks = (tasks, query) => {
    if (!query) return tasks;

    return tasks.filter((task) => {
        const taskName = task.name.toLowerCase();
        const taskNotes = task.notes.toLowerCase();
        return taskName.includes(query.toLowerCase()) || taskNotes.includes(query.toLowerCase())
    })
}

const TaskPanel = ({ tasks, query }) => {
    const user = useSelector(state => state.session.user);
    const [name, setTaskName] = useState('')
    const [errors, setErrors] = useState([])
    const filteredTasks = filterTasks(tasks, query)
    const dispatch = useDispatch()

    const updateTask = (e) => {
        setTaskName(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            name
        }
        return dispatch(createTask(payload, user)).catch(async(res)=> {
            // const data = await res.json()
            // if (data && data.errors) setErrors(data.errors)
        })
    }

    if (user) {
        return (
            <div id="task-panel">
                <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <form onSubmit={handleSubmit}>
                    <input
                        name='name'
                        type='text'
                        placeholder='Add a Task...'
                        value={name}
                        onChange={updateTask}
                    />
                    <button type='submit'>Add Task</button>
                </form>
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



export default TaskPanel;
