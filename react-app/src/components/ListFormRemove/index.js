import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { deleteList } from '../../store/lists';
import { loadLists } from '../../store/lists';
import './ListFormRemove.css'

function ListFormRemove ({hideForm, list}) {
    const user = useSelector(state => state.session.user);
    const history = useHistory()
    const dispatch = useDispatch()
    const [errors, setErrors] = useState([])

    if(!user) return (
        <Redirect to="/" />
    )

    const onSubmit = async e => {
        e.preventDefault();
        setErrors([]);
        await dispatch(deleteList(list))
        
        hideForm()
        history.push("/");
    }

    return (
        <div className="notebook-delete-form">
            <form onSubmit={onSubmit}>
                <ul hidden={errors.length === 0}>
                    {errors.map((error, i) => <li key={i}>{error}</li>)}
                </ul>
                <p>Are you sure you want to delete "{list.name}"?</p>
                <button type="submit">Delete List</button>
            </form>
        </div>
    )
}

export default ListFormRemove
