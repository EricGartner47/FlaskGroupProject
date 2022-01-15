
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { deleteTask, loadTasks, updateTask } from '../../store/tasks';
import './TaskFormUpdate.css'

const TaskFormUpdate = ({ task, setSelectedTask }) => {
    const user = useSelector(state => state.session.user);
    const lists = useSelector(state => state.lists);
    const userLists = Object.values(lists)
    const [taskName, setTaskName] = useState(task.name);
    const [notes, setNotes] = useState(task.notes || "");
    const [dueDate, setDueDate] = useState(task.due_date || "hello");
    const [completed, setCompleted] = useState(task.completed);
    let [list, setList] = useState(task.list_id);
    const [errors, setErrors] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        setTaskName(task.name);
        setNotes(task.notes);
        setDueDate(task.due_date || "");
        setCompleted(task.completed);
        setList(task.list_id);
    }, [task])

    const removeTaskButton = async e => {
        await dispatch(deleteTask(task))
        dispatch(loadTasks(user))
        setSelectedTask()
    }

    const handleSubmit = async e => {
        e.preventDefault();
        let payload;

        if (list === "select") {
            list = null;
        }

        if (errors.length > 0) {
            return
        } else if(taskName.length === 0) {
            setErrors(["Task name is required"])
            return
        }else {
            payload = {
                id: task.id,
                user_id: user.id,
                name: taskName,
                notes,
                due_date: dueDate,
                completed,
                list_id: list
            }
            await dispatch(updateTask(payload)).catch(async (res) => {
                const data = await res.json()
                if (data && data.errors) setErrors(data.errors)
            })
            dispatch(loadTasks(user));
        }
    }

    if (user) {
        return (
            <div id="task-update-panel">
                {errors.map((error, idx) => <div key={idx}>{error}</div>)}
                <div id="task-update-form">
                    <form onSubmit={handleSubmit}>
                        <div id="task-name-container">
                            <label htmlFor="task-name" id="label-task-name">Name Your Task</label>
                            <input
                                id="input-task-name"
                                name="task-name"
                                type='text'
                                placeholder='Add a Task...'
                                value={taskName}
                                onChange={e => {
                                    setTaskName(e.target.value)
                                    if (e.target.value.length === 0) setErrors(["Task name is required"])
                                    else if (e.target.value.length > 200) setErrors(["Task name must be 200 characters or fewer"])
                                    else setErrors([])
                                }}
                            />
                        </div>

                        <div className="fields">
                            <div className="field-container">
                                <label htmlFor="task-due-date">due</label>
                                <input
                                    id="task-due-date"
                                    name="task-due-date"
                                    type='date'
                                    value={dueDate}
                                    onChange={e => setDueDate(e.target.value)}
                                />
                            </div>

                            <div className="field-container">
                                <label htmlFor="list-select">list</label>
                                <select
                                    id="list-select"
                                    name="list-select"
                                    value={list || "select"}
                                    onChange={e => { setList(e.target.value) }}
                                >
                                    <option value={"select"}>Select a list</option>
                                    {userLists.map(list => {
                                        return <option key={list.id} value={list.id}>{list.name}</option>
                                    })}
                                </select>
                            </div>

                            <div className="field-container">
                                <label htmlFor="task-completed">complete</label>
                                {completed ? (<input
                                    id="task-completed"
                                    name="task-completed"
                                    type='checkbox'
                                    checked
                                    onChange={e => setCompleted(!completed)}
                                />) : (<input
                                    id="task-completed"
                                    name="task-completed"
                                    type='checkbox'
                                    onChange={e => setCompleted(!completed)}
                                />)}
                            </div>

                        </div>

                        <div id="notes-container">
                            <label htmlFor="task-notes" id="label-notes">Notes</label>
                            <br/>
                            <textarea
                                id="task-notes"
                                name="task-notes"
                                value={notes}
                                onChange={e => setNotes(e.target.value)}
                                rows={3}
                                cols={5}
                                placeholder="Add a note..."
                            />
                        </div>
                        <button type='submit' className="button-update-task">Update Task</button>
                    </form>
                    <button className="button-update-task" onClick={removeTaskButton}>Delete Task</button>
                </div>

            </div>
        )
    }

    else return (
        <Redirect to="/login" />
    );
}



export default TaskFormUpdate;
