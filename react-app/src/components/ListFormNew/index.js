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
        setErrors([]);

        const payload = {
            name,
            user_id: user.id
        }

        const newList = await dispatch(createList(payload))
            .then(async res => {
                setErrors(res.errors)
            })
            // .catch(async res => {
            //     const data = await res.json();
            //     if (data && data.errors) setErrors(data.errors);
            // })

        if (newList) hideForm();
    }

    return (
        <>
            <div className="list-form">
                <form onSubmit={onSubmit} id="new-list-form">
                    {errors.length > 0 && <ul className="error-list-new-list" hidden={errors.length === 0}>
                        {errors.map((error, i) => <li key={i}>{error}</li>)}
                    </ul>}
                    <label>Enter List Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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
