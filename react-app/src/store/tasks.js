const LOAD_TASKS = "tasks/LOAD_TASKS";

const getTasks = (user, tasks) => {
    return {
        type: LOAD_TASKS,
        user,
        tasks
    };
};


export const loadTasks = user => async dispatch => {
    const res = await fetch(`/api/users/${user.id}/tasks`);
    const data = await res.json();
    dispatch(getTasks(user, data));
    return res;
}

export const loadListTasks = (user, list) => async dispatch => {
    const res = await fetch(`/api/users/${user.id}/tasks/${list.id}`);
    const data = await res.json();
    dispatch(getTasks(user, data));
    return res;
}

const initialState = { }

export const tasksReducer = (state = initialState, action) => {
    const newState = { ...state }
    switch (action.type) {
        case LOAD_TASKS:
            const tasks = {}
            const allTasks = action.tasks.tasks
            allTasks.forEach(task => {
                tasks[task.id] = task;
            })
            return tasks
        default:
            return state;
    }
}
