import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { createList } from '../../store/lists';
import './ListFormNew.css'

function ListFormNew({ hideForm }) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const [name, setName] = useState('');
    const [errors, setErrors] = useState([]);

    if (!user) return (
        <Redirect to="/" />
    )

    const onSubmit = async e => {
        e.preventDefault();
        if (errors.length > 0) return;
        else {
            const payload = {
                name,
                user_id: user.id
            }
    
            const newList = await dispatch(createList(payload))
                .then(async res => {
                    if (res.errors) setErrors(res.errors);
                })
    
            if (newList) hideForm();
        }
    }

    return (
        <>
            <div className="list-form">
                <form onSubmit={onSubmit} id="new-list-form">
                    {errors.length > 0 && errors.map((error, i) => (
                        <div key={i} className="error-list-new-list">
                            {error}
                        </div>
                        ))
                    }
                    <label>Enter List Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value)
                            if (e.target.value.length === 0) setErrors(["Please enter a name for the list."])
                            else if (e.target.value.length > 200) setErrors(["The list's name must be 200 characters or fewer."])
                            else setErrors([])
                        }}
                        required
                        placeholder="Enter name"
                    />
                    <button type="submit">Create List</button>
                </form>
            </div>
        </>
    )
}

export default ListFormNew
