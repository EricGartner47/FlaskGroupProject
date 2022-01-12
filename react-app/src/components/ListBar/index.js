
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadLists } from '../../store/lists';
import './ListBar.css'

const ListBar = ({ lists, setList }) => {
    const user = useSelector(state => state.session.user);

    return (
        <nav id="listbar">
            <div className="ymtl-logo-listbar">
                <img src="/images/Notepad_icon.png" alt="" id="notepad"></img>
                <span>you made<br></br>the list</span>
            </div>
            <ul id="all-lists">
                <li className="list-header">Inbox</li>
                <li onClick={() => { setList() }}>All Tasks</li>
                <li onClick={() => { setList() }}>Today</li>
                <li onClick={() => { setList() }}>Tomorrow</li>
                <li onClick={() => { setList() }}>This Week</li>
                <li className="list-header" id="lists-header">Lists</li>
                {lists.map(list => {
                    return (
                        <li key={list.id} onClick={() => {
                            setList(list)
                        }
                        }>
                            {list.name}
                        </li>
                    )
                })}
            </ul>

        </nav>
    );
}

export default ListBar;
