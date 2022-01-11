
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import LogoutButton from '../auth/LogoutButton';
import DemoLoginButton from '../DemoLoginButton';
import Search from '../Search';
import './ListSummary.css'

const ListSummary = ({lists}) => {
    const user = useSelector(state => state.session.user);
    // const lists = useSelector(state => state.lists)
    const userLists = Object.values(lists)
    const dispatch = useDispatch();
    useEffect(() => {
        if (user) {
            // dispatch(loadLists(user));
        }
        else return;
    }, [dispatch, user]);


    return (
        <div id="list-summary">
            <ul>
                {userLists.map(list => {
                    return (
                        <li key={list.id}>
                            {}
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}

export default ListSummary;
