
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadLists } from '../../store/lists';
import './ListBar.css'

const ListBar = ({ lists, setList }) => {
    const user = useSelector(state => state.session.user);

    return (
        <nav id="listbar">
            <ul id="all-lists">
                <li onClick={() => {
                    setList()
                }}>All</li>
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
