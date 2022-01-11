from flask import Blueprint, jsonify
from flask_login import login_required
from app.forms.list_form import NewList
from app.models import User, Task, db, List
from app.forms import NewTask, NewList


user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


#update
@user_routes.route('/<int:id>/update')
@login_required
"""

This one is one function for all updates, because
    on the app, it's a form that takes all the information at once.

function which updates user information
    - first_name
    - last_name
    - username?
    - email?
    - password
"""
def update_user_information():
    # update user information with account settings form information upon submission
    # return <something>


#deactivate
@user_routes.route('/<int:id>/deactivate')
@login_required
def deactivate_user_account():
    # authenticate user
    # remove accunt from database
    # returns JSON message saying "Account deleted"


"""

Tasks Complete

"""

# GET tasks user has created
# route: - `/api/users/:id/tasks`
@user_routes.route('/<int:id>/tasks')
@login_required
"""
function gets tasks
    note: code written by Eric
"""
def get_user_tasks(id):
        # query tasks
        user = User.query.get(id)
        results = Task.query.filter(Task.user_id == user.id).all()
        # return json object with tasks
        return {'tasks': [task.to_dict() for task in results]}

"""

Tasks Incomplete

"""

# POST - create a new task
# route: - `/api/users/:id/tasks`
@user_routes.route('/<int:id>/tasks', methods=['POST'])
@login_required
"""
function creates a new task
    note: code written by Eric
    - Take user input for task name
    - Create new task in database
    - return <something>
"""
def create_task(id):
    user = User.query.get(id)
    form = NewTask()
    if form.validate_on_submit():
        task = Task()
        form.populate_obj(task)
        db.session.add(task)
        db.session.commit()
# not finished

# PUT - update task name
# route: - `/api/users/:id/tasks/:id/rename`
@task_routes.route('/<int:id>/rename', methods=['PUT'])
@login_required
def rename_task():
    # Change task name in database, based on user input
    # return <something>

# PUT - update task notes
# route: - `/api/users/:id/tasks/:id/update_notes`
@task_routes.route('/<int:id>/update_notes', methods=['PUT'])
@login_required
def update_notes():
    # Update task notes in database, based on user input
    # return <something>

# PUT - update task due date
# route: - `/api/users/:id/tasks/:id/update_duedate`
@task_routes.route('/<int:id>/update_duedate', methods=['PUT'])
@login_required
def update_duedate():
    # add/update due_date from calendar menu selection
    # return <something>


# PUT - toggle task completion
# route: - `/api/users/:id/tasks/:id/toggle_completion`
@task_routes.route('/<int:id>/toggle_completion', methods=['PUT'])
@login_required
def toggle_completion():
    # toggle task completion status; update in database
    # add/remove completed date
    # return <something>


# PUT - update task's list information
# route: - `/api/users/:id/tasks/:id/move`
@task_routes.route('/<int:id>/move', methods=['PUT'])
@login_required
def move_task():
    # add/change task's list_id in database based on user list menu selection
    # return <something>


# GET task information
# route: - `/api/tasks/:id`
@task_routes.route('/<int:id>')
@login_required
"""
function gets task information
"""
def task():
    # Query task based on id
    # return JSON with task information


# DELETE a task
# route: - `/api/tasks/:id`
@task_routes.route('/<int:id>', methods=['DELETE'])
@login_required
"""
function removes task from database
    note: different from moving note to trash folder
"""
def delete_task():
    # Delete task from database
    # return success message




"""

Lists Complete

"""

# GET list information
# route: `/api/users/:id/lists/:list_id`
@user_routes.route('/<int:id>/lists')
@login_required
"""
function retrieves user's lists
    note: code written by Eric
"""
def get_user_lists(id):
    user = User.query.get(id)
    # Query user's lists
    results = List.query.filter(List.user_id == user.id).all()
    # Return JSON object containing user's lists
    return {'lists': [list.to_dict() for list in results]}



"""

Lists Incomplete

"""

# POST - create a new list
# route: `/api/users/:id/lists`
@user_routes.route('/<int:id>/lists', methods=['POST'])
@login_required
"""
function creates new list
    - Enter list name in a form
        - return error if list with same name already exists
    - Add new list to database
    - Return {'message': 'List <list_name> created'}

    note: code written by Eric
"""
def create_list(id):
    user = User.query.get(id)
    form = NewList()
    if form.validate_on_submit():
        list = List()
        form.populate_obj(list)
        db.session.add(list)
        db.session.commit()
# not finished

# PUT - update list information
# route: `/api/users/:id/lists/:list_id/rename`
@task_routes.route('/<int:id>/rename')
@login_required
"""
function renames list
"""
def rename_list():
    # Receives a user input from a form
        # return error if list with same name already exists
    # Updates list name in database
    # Return success message


# DELETE a list
# route: `/api/users/:id/lists/:list_id/remove`
@task_routes.route('/<int:id>/remove')
@login_required
"""
function deletes list and all its associated tasks
"""
def remove_list():
    # Delete list and move its associated tasks to trash
    # Return {'message': 'List <list_name> deleted; incomplete tasks moved to trash(?)'}


# GET tasks that are in a list
# route: `/api/users/:id/lists/:list_id/tasks`
@task_routes.route('/<int:id>/tasks')
@login_required
"""
function queries all tasks belonging to list with list_id
"""
def list_tasks():
    # Query list's tasks
    # Return JSON object containing list's tasks

