
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadLists } from '../../store/lists';
import { Modal } from '../../context/Modal';
import ListFormNew from '../ListFormNew';
import './ListBar.css'

const ListBar = ({ lists, setList, setSelectedTask }) => {
    const user = useSelector(state => state.session.user);
    const [showForm, setShowForm] = useState(false);

    return (
        <nav id="listbar">
            <div className="ymtl-logo-listbar">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Notepad_icon.svg/2048px-Notepad_icon.svg.png" alt="" id="notepad"></img>
                <span>you made<br></br>the list</span>
            </div>
            <ul id="all-lists">
                <li className="list-header">Inbox</li>
                <li
                    onClick={() => {
                        setList()
                        setSelectedTask()
                    }
                }>
                    All Tasks
                </li>
                <li
                    onClick={() => {
                        setList()
                        setSelectedTask()
                    }
                }>
                    Today
                </li>
                <li
                    onClick={() => {
                        setList()
                        setSelectedTask()
                    }
                }>
                    Tomorrow
                </li>
                <li
                    onClick={() => {
                        setList()
                        setSelectedTask()
                    }
                }>
                    This Week
                </li>
                <li className="list-header" id="lists-header">
                    <div>
                        Lists
                    </div>
                    <i class="far fa-plus-square" onClick={() => setShowForm(true)}></i>
                    {showForm && (
                        <Modal onClose={() => setShowForm(false)}>
                            <ListFormNew hideForm={() => setShowForm(false)} />
                        </Modal>
                    )}
                </li>
                {lists.map(list => {
                    return (
                        <li key={list.id} onClick={() => {
                            setList(list)
                            setSelectedTask()
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
