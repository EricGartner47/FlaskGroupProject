from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from app.models import User, db, Task
from app.forms import TaskForm
from datetime import date
# from app.forms import LoginForm
# from app.forms import SignUpForm
# from flask_login import current_user, login_user, logout_user, login_required

task_routes = Blueprint('tasks', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

"""

All of these require authorization by the user to which these tasks belong

"""

# GET tasks user has created
# route: - `/api/users/:id/tasks`
# @task_routes.route('/')
# @login_required
# # """
# # function gets tasks
# # """
# def tasks():
	# query tasks
	# return json object with tasks


# POST - create a new task
# route: - `/api/users/:id/tasks`
# @task_routes.route('/', methods=['POST'])
# @login_required
# # """
# # function creates a new task
# # """
# def create_task():
	# Take user input for task name
	# Create new task in database
	# return <something>


# GET task information
# route: - `/api/tasks/:id`
@task_routes.route('/<int:id>')
@login_required
# """
# function gets task information
# """
def task(id):
	task = Task.query.get(id)
	return task.to_dict()
	# Query task based on id
	# return JSON with task information


# DELETE a task
# route: - `/api/tasks/:id`
@task_routes.route('/<int:id>', methods=['DELETE'])
@login_required
# # """
# # function removes task from database
# # 	note: different from moving note to trash folder
# # """
def delete_task(id):
	task = Task.query.get(id)
	db.session.delete(task)
	db.session.commit()
	return {'message': 'Successfully Deleted Task'}
	# Delete task from database
	# return success message


# PUT - update task information
# route: - `/api/tasks/:id/`
@task_routes.route('/<int:id>', methods=["PUT"])
@login_required
# '''
# function updates task information
# 	- name
# 	- notes
# 	- due_date
# 	- completed
# 	- completed_date
# 	- list_id (change to different list)
# 	- note: user_id not applicable
# '''
def update_task(id):
	task = Task.query.get(id)
	form = TaskForm()
	form['csrf_token'].data = request.cookies['csrf_token']
	if form.validate_on_submit():
		task.name = form.name.data
		task.notes = form.notes.data
		task.due_date = form.due_date.data
		# If the task was incomplete, but is now complete, completed date is today's date
		# task.completed represents whether the task was marked completed or not (before submitting the update form)
		if not task.completed and form.completed.data:
			task.completed_date = date.today()
		task.completed = form.completed.data
		# Now that task.completed is updated,
		# If the task is not complete, set completed_date to none
		if not task.completed:
			task.completed_date = None
		task.list_id = form.list_id.data

		db.session.commit()
		return task.to_dict()
	print(form.errors)
	return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# PUT - update task name
# # route: - `/api/users/:id/tasks/:id/rename`
# @task_routes.route('/<int:id>/rename', methods=['PUT'])
# @login_required
# def rename_task():
	# Change task name in database, based on user input
	# return <something>


# # PUT - update task notes
# # route: - `/api/users/:id/tasks/:id/update_notes`
# @task_routes.route('/<int:id>/update_notes', methods=['PUT'])
# @login_required
# def update_notes():
# 	# Update task notes in database, based on user input
# 	# return <something>


# # PUT - update task due date
# # route: - `/api/users/:id/tasks/:id/update_duedate`
# @task_routes.route('/<int:id>/update_duedate', methods=['PUT'])
# @login_required
# def update_duedate():
# 	# add/update due_date from calendar menu selection
# 	# return <something>


# # PUT - toggle task completion
# # route: - `/api/users/:id/tasks/:id/toggle_completion`
# @task_routes.route('/<int:id>/toggle_completion', methods=['PUT'])
# @login_required
# def toggle_completion():
# 	# toggle task completion status; update in database
# 	# add/remove completed date
# 	# return <something>


# # PUT - update task's list information
# # route: - `/api/users/:id/tasks/:id/move`
# @task_routes.route('/<int:id>/move', methods=['PUT'])
# @login_required
# def move_task():
# 	# add/change task's list_id in database based on user list menu selection
# 	# return <something>
