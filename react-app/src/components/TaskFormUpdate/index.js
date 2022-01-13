
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useParams, useHistory } from 'react-router-dom';
import { deleteTask, loadTasks, updateTask} from '../../store/tasks';
import UserBar from '../UserBar';
import './TaskFormUpdate.css'

const TaskFormUpdate = ({task}) => {
    const user = useSelector(state => state.session.user);
    const lists = useSelector(state => state.lists);
    const tasks = useSelector(state => state.tasks);
    const userLists = Object.values(lists)
    const history = useHistory()
    const [taskName, setTaskName] = useState(task.name);
    const [notes, setNotes] = useState(task.notes || "");
    const [dueDate, setDueDate] = useState(task.due_date || "");
    const [completed, setCompleted] = useState(task.completed);
    const [list, setList] = useState(task.list_id);
    const [errors, setErrors] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        setTaskName(task.name);
        setNotes(task.notes);
        setDueDate(task.due_date);
        setCompleted(task.completed);
        setList(task.list_id);
<<<<<<< HEAD
    }, [task])
=======
    },[task])

    const removeTaskButton = async () => {
        await dispatch(deleteTask(task))
        dispatch(loadTasks(user))
    }
>>>>>>> feature-task_form-static_url_delete

    const handleSubmit = async e => {
        e.preventDefault();
        let payload;
<<<<<<< HEAD
        if (dueDate !== '1969-12-32' && list) {
=======
        if (dueDate.slice(-6) !== '-12-32' && list) {
>>>>>>> feature-task_form-static_url_delete
            console.log("There's a due date and a list")
            payload = {
                id: task.id,
                user_id: user.id,
                name: taskName,
                notes,
                due_date: dueDate,
                completed,
                list_id: list
            }
        } else if (list) {
            console.log("There's a list")
            payload = {
                id: task.id,
                user_id: user.id,
                name: taskName,
                notes,
                completed,
                list_id: list
            }
<<<<<<< HEAD
        } else if (dueDate !== '1969-12-32') {
            console.log(`The dueDate is ${dueDate}`)
=======
        } else if (dueDate.slice(-6) !== '-12-32') {
            console.log(`The dueDate is ${dueDate}`)
            console.log(`The last six characters of dueDate are ${dueDate[-6]}`)
>>>>>>> feature-task_form-static_url_delete
            console.log("There's a due date")
            payload = {
                id: task.id,
                user_id: user.id,
                name: taskName,
                notes,
                due_date: dueDate,
                completed,
            }
        } else {
            console.log("There's no due date nor list")
            payload = {
                id: task.id,
                user_id: user.id,
                name: taskName,
                notes,
                completed,
            }
<<<<<<< HEAD
        } 
=======
        }
>>>>>>> feature-task_form-static_url_delete
        console.log(payload);
        await dispatch(updateTask(payload)).catch(async(res)=> {
            const data = await res.json()
            if (data && data.errors) setErrors(data.errors)
        })

        dispatch(loadTasks(user));
    }

    if (user) {
        return (
            <div id="task-update-panel">
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <form onSubmit={handleSubmit}>
                    <input
                        id="task-name"
                        type='text'
                        placeholder='Add a Task...'
                        value={taskName}
                        onChange={e => setTaskName(e.target.value)}
                    />
                    <textarea
                        id="task-notes"
                        value={notes}
                        onChange={e => setNotes(e.target.value)}
                        rows={3}
                        cols={5}
                        placeholder="Add a note..."
                    />
                    <input
                        id="task-due-date"
                        type='date'
                        value={dueDate}
                        onChange={e => setDueDate(e.target.value)}
                    />
                    <input
                        id="task-completed"
                        type='checkbox'
                        value={completed}
                        onChange={e => setCompleted(!completed)}
                    />
                    <select
                        id="list-select"
                        value={list || "select"}
                        onChange={e => { setList(e.target.value) }}
                    >
                        <option value={"select"}>Select a notebook</option>
                        {userLists.map(list => {
                            return <option key={list.id} value={list.id}>{list.name}</option>
                        })}
                    </select>
                    <button type='submit'>Update Task</button>
                </form>
                    <button onClick={removeTaskButton}>Delete Task</button>
            </div>
        )
    }

    else return (
        <Redirect to="/login" />
        );
}



export default TaskFormUpdate;
