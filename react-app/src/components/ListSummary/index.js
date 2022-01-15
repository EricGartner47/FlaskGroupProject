
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
            <div id="summary-container">
                <div className="summary-box">
                    <div className="task-quantity" id="task-summary">
                        { userTasks.length }
                    </div>
                    <div className="task-quality">
                        tasks
                    </div>
                </div>
                <div className="summary-box">
                    <div className="task-quantity" id="incomplete-summary">
                        { incompleteTasks.length }
                    </div> 
                    <div className="task-quality">
                        incomplete
                    </div>
                </div>
                <div className="summary-box">
                    <div className="task-quantity" id="completed-summary">
                        { completedTasks.length }
                    </div> 
                    <div className="task-quality">
                        completed
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListSummary;
