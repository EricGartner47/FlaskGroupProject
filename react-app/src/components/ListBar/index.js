
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import LogoutButton from '../auth/LogoutButton';
import DemoLoginButton from '../DemoLoginButton';
import Search from '../Search';
import './ListBar.css'

const ListBar = () => {
    const user = useSelector(state => state.session.user);
    // const lists = useSelector(state => state.lists)
    // const userLists = Object.values(lists)
    const dispatch = useDispatch();
    useEffect(() => {
        if (user) {
            // dispatch(loadLists(user));
        }
        else return;
    }, [dispatch, user]);


    return (
        <nav id="listbar">
            <ul>
                <li>List 1</li>
                <li>List 2</li>
            </ul>

        </nav>
    );
}

export default ListBar;
