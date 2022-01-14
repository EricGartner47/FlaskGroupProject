const LOAD_TASKS = "tasks/LOAD_TASKS";
const ADD_TASK = "task/ADD_TASK"
const REMOVE_TASK = 'task/REMOVE_TASK'

const getTasks = (user, tasks) => {
    return {
        type: LOAD_TASKS,
        user,
        tasks
    };
};

const addTask = (tasks) => {
    return {
        type: ADD_TASK,
        tasks
    };
};

const removeTask = (task) => {
    return {
        type: REMOVE_TASK,
        task
    };
};


export const loadTasks = user => async dispatch => {
    const res = await fetch(`/api/users/${user.id}/tasks`);
    const data = await res.json();
    console.log(data)
    dispatch(getTasks(user, data));
    return res;
}

export const loadListTasks = (user, list) => async dispatch => {
    let res;
    if (list.id) {
        res = await fetch(`/api/users/${user.id}/tasks/${list.id}`);
    } else {
        res = await fetch(`/api/users/${user.id}/tasks/${list}`);
    }
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
        dispatch(addTask(data))
        return data
    }
}

export const updateTask = (task) => async dispatch => {
    const res = await fetch(`/api/tasks/${task.id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(task)
    });
    const data = await res.json();
    if(res.ok) {
        dispatch(addTask(data))
        return data
    }
}

export const deleteTask = (task) => async dispatch => {
    const res = await fetch(`/api/tasks/${task.id}`, {
        method: 'DELETE'
    });
    const data = await res.json();
    if(res.ok) {
        dispatch(removeTask(data))
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
                let dueDate = new Date(task.due_date)
                if (task.due_date) {
                    if (dueDate.getMonth() < 9 && dueDate.getDate() < 10) {
                        task.due_date = `${dueDate.getFullYear()}-0${dueDate.getMonth() + 1}-0${dueDate.getDate() + 1}`
                    } else if (dueDate.getMonth() < 9) {
                        task.due_date = `${dueDate.getFullYear()}-0${dueDate.getMonth() + 1}-${dueDate.getDate() + 1}`
                    } else if (dueDate.getDate() < 10) {
                        task.due_date = `${dueDate.getFullYear()}-${dueDate.getMonth() + 1}-0${dueDate.getDate() + 1}`
                    } else {
                        task.due_date = `${dueDate.getFullYear()}-${dueDate.getMonth() + 1}-${dueDate.getDate() + 1}`
                    }
                }
                tasks[task.id] = task;
            })
            return tasks
        case ADD_TASK:
            newState[action.tasks.id] = action.tasks
            return newState;
        case REMOVE_TASK:
            delete newState[action.task.id]
            return newState
        default:
            return state;
    }
}
