const LOAD_LISTS = 'list/LOAD_LISTS'

const getList = (user, lists) => {
    return {
        type: LOAD_LISTS,
        user,
        lists
    }
}

export const loadLists = user => async dispatch => {
    const res = await fetch(`api/users/${user.id}/lists`)
    const data = await res.json();
    dispatch(getList(user, data));
    return res;
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
        default:
            return state;
    }
}
