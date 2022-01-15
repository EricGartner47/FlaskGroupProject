
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { loadTasks, createTask } from '../../store/tasks';
import './TaskPanel.css'

const filterTasks = (tasks, query) => {
    tasks.sort((a, b) => {
        return Date.parse(a.due_date) - Date.parse(b.due_date);
    })
    if (!query) return tasks;
    return tasks.filter((task) => {
        const taskName = task.name.toLowerCase();
        const taskNotes = task.notes?.toLowerCase();
        return taskName.includes(query.toLowerCase()) || taskNotes?.includes(query.toLowerCase())
    })
}

const TaskPanel = ({ tasks, query, setSelectedTask }) => {
    const user = useSelector(state => state.session.user);
    const [taskName, setTaskName] = useState('')
    const [errors, setErrors] = useState([])
    const [complete, setComplete] = useState(false)
    const [buttonSwitch, setButtonSwitch] = useState(false)
    const filteredTasks = filterTasks(tasks, query)
    const completeTasks = filteredTasks.filter(task => task.completed === complete)

    const dispatch = useDispatch()
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    const updateTask = (e) => {
        setTaskName(e.target.value);
        if (e.target.value.length > 200) setErrors(["Task name should be fewer than 200 characters"])
        else if (e.target.value.length === 0) setErrors(["Task name is required"])
        else setErrors([])
    }

    useEffect(() => {
        
    }, [complete])

    useEffect(() => {
        if (!buttonSwitch) return;
        const closeActions = () => {
            setButtonSwitch(false)
        }

        document.addEventListener("click", closeActions)
        let input = document.getElementById('new-task-input');
        input.addEventListener('click', function (e) {
            setButtonSwitch(true)
            e.stopPropagation();
        }, false);

        return () => document.removeEventListener('click', closeActions)
    }, [buttonSwitch])

    const showButton = <button type='submit' id='add-task-button'>Add Task</button>;

    const handleSubmit = async e => {
        e.preventDefault();

        if (errors.length > 0) return
        else if (taskName.length === 0) {
            setErrors(["Task name is required."])
            return
        }
        else {
            const payload = {
                name: taskName,
                user_id: user.id
            }
            await dispatch(createTask(payload, user)).catch(async(res)=> {
                const data = await res.json()
                if (data && data.errors) setErrors(data.errors)
            })
            dispatch(loadTasks(user));
        }
    }

    if (user) {
        return (
            <div id="task-list-panel">
                <div id="task-list-tabs">
                    <div className={complete ? "task-list-tab" : "selected task-list-tab"} onClick={() => setComplete(false)}>Incomplete</div>
                    <div className={complete ? "selected task-list-tab" : "task-list-tab"} onClick={() => setComplete(true)}>Completed</div>
                </div>
                {!complete && (
                    <div id="task-bar">
                        {errors.map((error, idx) => <div key={idx}>{error}</div>)}
                        <form id="new-task-input" onSubmit={handleSubmit}>
                            <input
                                name='name'
                                type='text'
                                placeholder='Add a task...'
                                value={taskName}
                                autoComplete="off"
                                onChange={updateTask}
                                onClick={() => setButtonSwitch(true)}
                            />
                            {buttonSwitch && showButton}
                        </form>
                    </div>
                )
                }
                <div id="task-cards-container">
                    {completeTasks.map(task => {
                        let today = new Date()
                        let overdue = Date.parse(task.due_date) < Date.parse(today) && !task.completed
                        let split = task.due_date.split("-")
                        let month = split[1]
                        let day = split[2]
                        return (
                            <div className="task-card" key={task.id} >
                                <li 
                                    onClick={() => { 
                                        setSelectedTask(task) }}
                                >
                                    <div>
                                        {task.name}
                                    </div>
                                    <div className={overdue ? "overdue task-due-date" : "task-due-date"}>
                                        {`${months[month-1]} ${day}`}
                                    </div>
                                </li>
                            </div>
                        )
                    })}
                </div>

            </div>
        )
    }

    else return (
        <Redirect to="/login" />
        );
}



export default TaskPanel;
