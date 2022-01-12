import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { loadTasks } from '../../store/tasks';
import { loadLists } from '../../store/lists';
import UserBar from '../UserBar';
import TaskPanel from '../TaskPanel'
import ListBar from '../ListBar';
import ListSummary from '../ListSummary';
import './Dashboard.css'
import { usePage } from '../../context/AppContext';
import TaskFormUpdate from '../TaskFormUpdate';


const Dashboard = () => {
    const user = useSelector(state => state.session.user);
    const lists = useSelector(state => state.lists)
    const tasks = useSelector(state => state.tasks)
    const { list, setList } = usePage()
    const { search } = window.location;
    const query = new URLSearchParams(search).get('s');
    const [searchQuery, setSearchQuery] = useState(query || '');

    const userLists = Object.values(lists)
    const userTasks = Object.values(tasks)
    const dispatch = useDispatch();
    useEffect(() => {
        if (user) {
            dispatch(loadTasks(user));
            dispatch(loadLists(user));
        }
        else return;
    }, [dispatch, user]);

    if (user) {
        return (
            <div id="dashboard">
                <UserBar
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    setList={setList} />
                <div id="dashboard-content">
                    <ListBar lists={userLists} setList={setList}/>
                    <TaskPanel tasks={userTasks} query={searchQuery}/>
                    <Switch>
                        <Route path='/app' exact={true}>
                            <ListSummary lists={userLists} list={list}/>
                        </Route>
                        <Route path='/app/tasks/:taskId'>
                            <TaskFormUpdate />
                        </Route>
                    </Switch>
                </div>
            </div>
        )
    }

    else return (
        <Redirect to="/login" />
    );
}

export default Dashboard;
