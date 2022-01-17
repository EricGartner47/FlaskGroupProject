const LOAD_LISTS = 'list/LOAD_LISTS'
const NEW_LIST = 'list/NEW_LIST'
const REMOVE_LIST = 'list/REMOVE_LIST'
const CLEAR_LISTS = 'list/CLEAR_LISTS'

const getList = (user, lists) => {
    return {
        type: LOAD_LISTS,
        user,
        lists
    }
}

const addList = list => {
    return {
        type: NEW_LIST,
        list
    }
}

const removeList = list => {
    return {
        type: REMOVE_LIST,
        list
    }
}

 export const clearLists = () => {
    return {
        type: CLEAR_LISTS
    }
}

export const loadLists = user => async dispatch => {
    const res = await fetch(`/api/users/${user.id}/lists`)
    const data = await res.json();
    dispatch(getList(user, data));
    return data;
}

export const createList = payload => async dispatch => {
    const res = await fetch(`/api/users/${payload.user_id}/lists`, {
        method:'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    const data = await res.json();
    dispatch(addList(data));
    return data;
}

export const updateList = payload => async dispatch => {
    const res = await fetch(`/api/lists/${payload.id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    if(res.ok){
        const data = await res.json();
        dispatch(addList(data))
        return data;
    }
}

export const deleteList = payload => async dispatch=> {
    const res = await fetch(`api/lists/${payload.id}`, {
        method: 'DELETE'
    })
    if(res.ok) {
        const data = await res.json();
        dispatch(removeList(payload))
        return data
    }
}

const initialState = {}

export const listReducer = (state = initialState, action) => {
    const newState = {...state}
    switch (action.type) {
        case LOAD_LISTS:
            const lists = {}
            const allLists = action.lists.lists
            allLists.forEach(list => {
                lists[list.id] = list
            })
            return { ...state, ...lists}
        case NEW_LIST:
            newState[action.list.id] = action.list
            return newState;
        case REMOVE_LIST:
            delete newState[action.list.id]
            return newState;
        case CLEAR_LISTS:
            return {};
        default:
            return state;
    }
}
