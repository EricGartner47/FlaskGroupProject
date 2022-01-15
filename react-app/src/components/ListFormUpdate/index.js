import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { updateList } from '../../store/lists';
import './ListFormUpdate.css'

function ListFormUpdate({hideForm, list}) {
    const user = useSelector(state => state.session.user)
    const [name, setName] = useState(list.name)
    const [errors, setErrors] = useState([])
    const dispatch = useDispatch()

    if(!user) return (
        <Redirect to="/" />
    )

    const onSubmit = async e => {
        e.preventDefault();
        if (errors.length > 0) return
        else {
            const payload = {
                id: list.id,
                name,
                user_id: user.id
            }
    
            const updatedList = await dispatch(updateList(payload))
                .then(async res => {
                    if (res.errors) setErrors(res.errors)
                })
    
            if (updatedList) hideForm();
        }
    }
    return(
        <>
            <div className="list-form">
                <form onSubmit={onSubmit} id="update-list-form">
                    {errors.length > 0 && <ul className="error-list-new-list" hidden={errors.length === 0}>
                        {errors.map((error, i) => <li key={i}>{error}</li>)}
                    </ul>}
                    <label>Update List Name:</label>
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
                        placeholder={name}
                    />
                    <button type="submit">Update List</button>
                </form>
            </div>
        </>
    )

}

export default ListFormUpdate
