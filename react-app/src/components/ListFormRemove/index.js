import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { deleteList } from '../../store/lists';
import './ListFormRemove.css'

function ListFormRemove ({hideForm, list}) {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [errors, setErrors] = useState([])

    if(!user) return (
        <Redirect to="/" />
    )

    const removeList = async () => {
        dispatch(deleteList(list))
        if(deleteList){
            hideForm()
        }
    }

    return (
        <div>
            <span>Remove List</span>
            <p>Are you sure you want to remove {list.name}? </p>
            <button onClick={removeList}></button>

        </div>
    )
}

export default ListFormRemove
