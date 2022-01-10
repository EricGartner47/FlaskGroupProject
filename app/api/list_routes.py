from flask import Blueprint, jsonify #, session, request
from flask_login import login_required
# from app.models import User, db
# from app.forms import LoginForm
# from app.forms import SignUpForm
# from flask_login import current_user, login_user, logout_user, login_required


list_routes = Blueprint('lists', __name__)


# GET lists
# route: `/api/users/:id/lists`
@task_routes.route('/')
@login_required
"""
function returns lists
"""
def lists():
	#Query lists belonging to user
	task_lists = #insert query here
	return {'lists': [task_list.to_dict() for task_list in task_lists]}


# POST - create a new list
# route: `/api/users/:id/lists/new`
@task_routes.route('/new')
@login_required
"""
function creates new list
"""
def create_list():
	# Enter list name in a form
	# Add new list to database
	# Return {'message': 'List <list_name> created'}


# GET list information
# route: `/api/users/:id/lists/:list_id`
@task_routes.route('/<int:id>')
@login_required
"""
function retrieves user's lists
"""
def lists():
	# Query user's lists
	# Return JSON object containing user's lists


# PUT - update list information
# route: `/api/users/:id/lists/:list_id/rename`
@task_routes.route('/<int:id>/rename')
@login_required
"""
function renames list
"""
def rename_list():
	# Receives a user input from a form
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

