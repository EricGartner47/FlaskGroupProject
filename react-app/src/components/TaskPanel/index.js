
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { loadTasks, loadListTasks, createTask } from '../../store/tasks';
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

const TaskPanel = ({ tasks, query, list, setSelectedTask }) => {
    const user = useSelector(state => state.session.user);
    const [taskName, setTaskName] = useState('')
    const [errors, setErrors] = useState([])
    const [complete, setComplete] = useState(false)
    const [buttonSwitch, setButtonSwitch] = useState(false)
    let filteredTasks = filterTasks(tasks, query)
    let completeTasks = filteredTasks.filter(task => task.completed === complete)

    const dispatch = useDispatch()
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    const updateTask = (e) => {
        setTaskName(e.target.value);
        if (e.target.value.length > 200) setErrors(["Task name should be fewer than 200 characters"])
        else if (e.target.value.length === 0) setErrors(["Task name is required"])
        else setErrors([])
    }

    useEffect(() => {
        if (!buttonSwitch) return;
        const closeActions = () => {
            setButtonSwitch(false);
            setErrors([]);
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
        else if (list) {
            const payload = {
                name: taskName,
                user_id: user.id,
                list_id: list.id
            }
            const newTask = await dispatch(createTask(payload, user)).catch(async(res)=> {
                const data = await res.json()
                if (data && data.errors) setErrors(data.errors)
            })
            dispatch(loadListTasks(user, list));
            setTaskName('')
            setSelectedTask(newTask);
            setButtonSwitch(false)
        }
        else {
            const payload = {
                name: taskName,
                user_id: user.id
            }
            const newTask = await dispatch(createTask(payload, user)).catch(async(res)=> {
                const data = await res.json()
                if (data && data.errors) setErrors(data.errors)
            })
            dispatch(loadTasks(user));
            setTaskName('');
            setSelectedTask(newTask);
            setButtonSwitch(false);
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
                        {errors.map((error, idx) => <div id="new-task-error" key={idx}>{error}</div>)}
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
                        let today, overdue, split, month, day
                        if (task.due_date) {
                            let base = new Date()
                            today = new Date(base.getFullYear(), base.getMonth(), base.getDate() - 1)
                            today.setHours(0,0,0,0)
                            overdue = Date.parse(task.due_date) < Date.parse(today) && !task.completed
                            split = task.due_date.split("-")
                            month = split[1]
                            day = split[2]
                        }
                        return (
                            <div className="task-card" key={task.id} >
                                <li 
                                    onClick={() => { 
                                        setSelectedTask(task) }}
                                >
                                    <div className="task-name">
                                        {task.name}
                                    </div>
                                    <div className={overdue ? "overdue task-due-date" : "task-due-date"}>
                                        {`${month ? months[month-1] : ""} ${day ? day : ""}`}
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
