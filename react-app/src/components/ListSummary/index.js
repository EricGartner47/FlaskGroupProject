
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

    let base = new Date()
    let today = new Date(base.getFullYear(), base.getMonth(), base.getDate() - 1)
    let overdueTasks = incompleteTasks.filter(task => {
        return Date.parse(task.due_date) < Date.parse(today)
    })
    let todayTasks = incompleteTasks.filter(task => {
        today.setHours(0,0,0,0)
        let due = new Date(task.due_date)
        due.setHours(0,0,0,0)
        return Date.parse(due) === Date.parse(today)
    })
    let tomorrowTasks = incompleteTasks.filter(task => {
        today.setHours(0, 0, 0, 0)
        let due = new Date(task.due_date)
        due.setHours(0, 0, 0, 0)
        console.log()
        return Date.parse(due) === Date.parse(today) + 86400000
    })


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
            <h2>{list ? list.name ? list.name : list : "All Tasks"}</h2>
            <div id="summary-container">
                <div className="summary-box">
                    <div className="task-quantity" id="task-summary">
                        { incompleteTasks.length }
                    </div> 
                    <div className="task-quality">
                        tasks
                    </div>
                </div>
                {overdueTasks.length > 0 && (
                    <div className="summary-box">
                        <div className="task-quantity" id="overdue-summary">
                            { overdueTasks.length }
                        </div> 
                        <div className="task-quality">
                            overdue
                        </div>
                    </div>
                )}
                {todayTasks.length > 0 && (
                    <div className="summary-box">
                        <div className="task-quantity" id="today-summary">
                            {todayTasks.length}
                        </div>
                        <div className="task-quality">
                            due today
                        </div>
                    </div>
                )}
                {tomorrowTasks.length > 0 && (
                    <div className="summary-box">
                        <div className="task-quantity" id="tomorrow-summary">
                            {tomorrowTasks.length}
                        </div>
                        <div className="task-quality">
                            due tomorrow
                        </div>
                    </div>
                )}
                <div className="summary-box">
                    <div className="task-quantity completed-summary">
                        {completedTasks.length}
                    </div>
                    <div className="task-quality completed-summary">
                        completed
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListSummary;
