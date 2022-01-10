from flask import Blueprint, jsonify #, session, request
from flask_login import login_required
# from app.models import User, db
# from app.forms import LoginForm
# from app.forms import SignUpForm
# from flask_login import current_user, login_user, logout_user, login_required

task_routes = Blueprint('tasks', __name__)


"""

All of these require authorization by the user to which these tasks belong

"""

# GET tasks user has created
# route: - `/api/users/:id/tasks`
@task_routes.route('/')
@login_required
"""
function gets tasks
"""
def tasks():
	# query tasks
	# return json object with tasks


# POST - create a new task
# route: - `/api/users/:id/tasks`
@task_routes.route('/', methods=['POST'])
@login_required
"""
function creates a new task
"""
def create_task:
	# Take user input for task name
	# Create new task in database
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

For updating task information,
	I have set up multiple routes,
	instead of one function with many parameters.

Justifications:
	- Each function has a single responsibility
	- The remember the milk UI changes one attribute at a time
	- Easier to add features

Example, pseudocode - a singular update function

	# PUT - update task information
	# route: - `/api/users/:id/tasks/:id/update`
	@task_routes.route('/<int:id>/')
	@login_required
	function updates task information
		- name
		- notes
		- due_date
		- completed
		- completed_date
		- list_id (change to different list)
		- note: user_id not applicable

"""


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
