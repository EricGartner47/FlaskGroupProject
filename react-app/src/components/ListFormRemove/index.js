import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { deleteList } from '../../store/lists';
import './ListFormRemove.css'

function ListFormRemove ({hideForm, list, setList}) {
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);

    if(!user) return <Redirect to="/" />;

    const onSubmit = async e => {
        e.preventDefault();
        setErrors([]);
        await dispatch(deleteList(list));
        setList();
        hideForm();
    }

    return (
        <div className="list-form">
            <form onSubmit={onSubmit}>
                <h4 id="new-list-heading">Remove list</h4>
                <ul hidden={errors.length === 0}>
                    {errors.map((error, i) => <li key={i}>{error}</li>)}
                </ul>
                <label id="remove-list-label">Are you sure you wish to remove the list "{list.name}"?</label>
                <div id="list-form-button-container">
                    <button type="submit" id="delete-list-button">Yes, remove list</button>
                    <button type="button" id="cancel-button" onClick={hideForm}>Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default ListFormRemove
