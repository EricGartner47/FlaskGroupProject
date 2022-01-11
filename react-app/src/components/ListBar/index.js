
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadLists } from '../../store/lists';
import './ListBar.css'

const ListBar = () => {
    const user = useSelector(state => state.session.user);
    const lists = useSelector(state => state.lists)
    const userLists = Object.values(lists)
    const dispatch = useDispatch();
    useEffect(() => {
        if (user) {
            dispatch(loadLists(user));
        }
        else return;
    }, [dispatch, user]);


    return (
        <nav id="listbar">
            <ul>
            {userLists.map(list => {
                    return (
                        <li key={list.id}>
                            {list.name}
                        </li>
                    )
                })}
            </ul>

        </nav>
    );
}

export default ListBar;
