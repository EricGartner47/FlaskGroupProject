const LOAD_TASKS = "tasks/LOAD_TASKS";
const ADD_TASK = "task/ADD_TASK"

const getTasks = (user, tasks) => {
    return {
        type: LOAD_TASKS,
        user,
        tasks
    };
};

const addTask = (user, tasks) => {
    return {
        type: ADD_TASK,
        user,
        tasks
    }
}


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

export const createTask = (newTask, user) =>  async dispatch => {
    const res = await fetch(`/api/users/${user.id}/tasks`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newTask)
    });
    const data = await res.json();
    if(res.ok) {
        dispatch(addTask(data, user))
        return data
    }
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
        case ADD_TASK:
            newState[action.tasks.id] = action.tasks
            return newState;
        default:
            return state;
    }
}
