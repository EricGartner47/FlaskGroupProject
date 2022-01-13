const LOAD_LISTS = 'list/LOAD_LISTS'
const NEW_LIST = 'list/NEW_LIST'

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

export const loadLists = user => async dispatch => {
    const res = await fetch(`/api/users/${user.id}/lists`)
    const data = await res.json();
    dispatch(getList(user, data));
    return res;
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
    return res;
}

export const updateList = payload => async dispatch => {
    const res = await fetch(`/api/lists/${payload.id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    const data = await res.json();
    dispatch(addList(data))
    return res
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
        default:
            return state;
    }
}
