
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadLists } from '../../store/lists';
import { Modal } from '../../context/Modal';
import ListFormNew from '../ListFormNew';
import './ListBar.css'
import ListFormUpdate from '../ListFormUpdate';
import ListFormRemove from '../ListFormRemove';

const ListBar = ({ setList, setSelectedTask }) => {
    const user = useSelector(state => state.session.user);
    const userLists = useSelector(state => state.lists);
    const lists = Object.values(userLists)
    const [showNewForm, setShowNewForm] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [showButtons, setShowButtons] = useState(false)
    const dispatch = useDispatch()
    const openActions = (id) => {
        if (showButtons) return;
        return setShowButtons(id)
    }

    console.log(lists)

    useEffect(() => {
        dispatch(loadLists(user))
    }, [dispatch, user])

    useEffect(() => {
        if (!showButtons) return;
        const closeActions = () => {
            setShowButtons(false)
        }
        document.addEventListener("click", closeActions)
        return () => document.removeEventListener('click', closeActions)
    }, [showButtons])

    return (
        <nav id="listbar">
            <div onClick={() => {
                setList();
                setSelectedTask();
            }}  className="ymtl-logo-listbar">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Notepad_icon.svg/2048px-Notepad_icon.svg.png" alt="" id="notepad"></img>
                <span>you made<br/>the list</span>
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
                        setList("Today")
                        setSelectedTask()
                    }
                    }>
                    Today
                </li>
                <li
                    onClick={() => {
                        setList("Tomorrow")
                        setSelectedTask()
                    }
                    }>
                    Tomorrow
                </li>
                <li
                    onClick={() => {
                        setList("This Week")
                        setSelectedTask()
                    }
                    }>
                    This Week
                </li>
                <li className="list-header" id="lists-header">
                    <div>
                        Lists
                    </div>
                    <i className="far fa-plus-square" onClick={() => setShowNewForm(true)}></i>
                    {showNewForm && (
                        <Modal onClose={() => setShowNewForm(false)}>
                            <ListFormNew hideForm={() => setShowNewForm(false)} setList={setList} />
                        </Modal>
                    )}
                </li>
                {lists.map(list => {
                    let incomplete = Object.values(list.tasks).filter(task => task.completed !== true)
                    let count = incomplete.length
                    return (
                        <li className="user-list" key={list.id} onClick={() => {
                            setList(list)
                            setSelectedTask()
                        }
                        }>
                            <div className="list-name">
                                {list.name}
                            </div>
                            <div className="list-dropdown" onClick={() => openActions(list.id)}>
                                <div className="incomplete-count">
                                    {count}
                                </div>
                                <i className="fas fa-caret-down"></i>
                                {showButtons === list.id &&
                                    <div className="list-actions-dropdown">
                                        <button className="list-link" onClick={
                                            () => setShowUpdateForm(list.id + "edit")
                                        }>Rename List</button>
                                        <button className="list-link" onClick={
                                            () => setShowUpdateForm(list.id + "delete")
                                        }>Delete List</button>
                                    </div>
                                }
                            </div>
                            {showUpdateForm === (list.id + "edit") && (
                                <Modal onClose={() => setShowUpdateForm(false)}>
                                    <ListFormUpdate hideForm={() => setShowUpdateForm(false)} list={list} />
                                </Modal>
                            )}
                            {showUpdateForm === (list.id + "delete") &&
                                (
                                    <Modal onClose={() => setShowUpdateForm(false)}>
                                        <ListFormRemove setList={setList} hideForm={() => setShowUpdateForm(false)} list={list} />
                                    </Modal>
                                )
                            }
                        </li>
                    )
                })}
            </ul>

        </nav>
    );
}

export default ListBar;
