
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadLists } from '../../store/lists';
import { Modal } from '../../context/Modal';
import ListFormNew from '../ListFormNew';
import './ListBar.css'
import ListFormUpdate from '../ListFormUpdate';
import ListFormRemove from '../ListFormRemove';

const ListBar = ({ lists, setList, setSelectedTask }) => {
    const user = useSelector(state => state.session.user);
    const [showNewForm, setShowNewForm] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [showRemoveForm, setShowRemoveForm] = useState(false);
    const [showButtons, setShowButtons] = useState('')


    const openActions = (id) => {
        if(showButtons) return;
        return setShowButtons(id)
    }

    useEffect(()=> {
        if(!showButtons) return;
        const closeActions = () => {
            setShowButtons(false)
        }
        document.addEventListener("click", closeActions)
        return ()=> document.removeEventListener('click', closeActions)
    }, [showButtons])

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
                    <i class="far fa-plus-square" onClick={() => setShowNewForm(true)}></i>
                    {showNewForm && (
                        <Modal onClose={() => setShowNewForm(false)}>
                            <ListFormNew hideForm={() => setShowNewForm(false)} />
                        </Modal>
                    )}
                </li>
                {lists.map(list => {
                    return (
                        <div>
                            <li key={list.id} onClick={() => {
                                setList(list)
                                setSelectedTask()
                                }
                            }>
                                {list.name}
                            </li>
                            <i class="fas fa-caret-down" onClick={()=> openActions(list.id)}></i>
                            {showButtons === list.id && (
                                <div>
                                    <button onClick={()=> setShowUpdateForm(true)}>Update List</button>
                                    <button onClick={()=> setShowRemoveForm(true)}>Delete List</button>
                                    <Modal onClose={()=> setShowUpdateForm(false)}>
                                        <ListFormUpdate hideForm={()=> setShowUpdateForm(false)} list={list}/>
                                        <ListFormRemove hideForm={()=> setShowRemoveForm(false)} list={list}/>
                                    </Modal>
                                </div>

                            )}
                        </div>
                    )
                })}
            </ul>

        </nav>
    );
}

export default ListBar;
