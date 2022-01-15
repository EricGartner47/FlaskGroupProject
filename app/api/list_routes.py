from flask import Blueprint, jsonify, request, session
from flask_login import login_required
from app.models import User, db, List
from app.forms import ListForm
# from app.forms import SignUpForm
# from flask_login import current_user, login_user, logout_user, login_required


list_routes = Blueprint('lists', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


# GET lists
# route: `/api/users/:id/lists`
# @task_routes.route('/')
# @login_required
# """
# function returns lists
# """
# def lists():
# 	#Query lists belonging to user
# 	task_lists = #insert query here
# 	return {'lists': [task_list.to_dict() for task_list in task_lists]}


# POST - create a new list
# route: `/api/users/:id/lists/new`
# @task_routes.route('/new')
# @login_required
# # """
# # function creates new list
# # """
# def create_list():
	# Enter list name in a form
	# Add new list to database
	# Return {'message': 'List <list_name> created'}


# GET list information
# route: `/api/users/:id/lists/:list_id`
# @task_routes.route('/<int:id>')
# @login_required
# # """
# # function retrieves user's lists
# # """
# def lists():
	# Query user's lists
	# Return JSON object containing user's lists


# PUT - update list information
# route: `/api/users/:id/lists/:list_id/rename`
@list_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_list(id):
	list = List.query.get(id)
	form = ListForm()
	form['csrf_token'].data = request.cookies['csrf_token']
	print(form.data)
	if len(form.name.data) < 201 and form.validate_on_submit:
		print("validated")
		list.name = form.name.data
		db.session.commit()
		return list.to_dict()
	if len(form.name.data) > 200:
		return_errors = {'name': ['List must be 200 characters or fewer.']}
		print("returning errors", return_errors)
		return {'errors': validation_errors_to_error_messages(return_errors)}, 401
	return {'errors': validation_errors_to_error_messages(form.errors)}, 401
	# Receives a user input from a form
	# Updates list name in database
	# Return success message
	{'name': ['List must be 200 characters or fewer.']}
	{'name': ['List must be 200 characters or fewer.']}

@list_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_list(id):
	list = List.query.get(id)
	db.session.delete(list)
	db.session.commit()
	return {'message': 'Successfully Deleted List'}


# DELETE a list
# route: `/api/users/:id/lists/:list_id/remove`
# @task_routes.route('/<int:id>/remove')
# @login_required
# # """
# # function deletes list and all its associated tasks
# # """
# def remove_list():
	# Delete list and move its associated tasks to trash
	# Return {'message': 'List <list_name> deleted; incomplete tasks moved to trash(?)'}


# GET tasks that are in a list
# # route: `/api/users/:id/lists/:list_id/tasks`
# @task_routes.route('/<int:id>/tasks')
# @login_required
# # """
# # function queries all tasks belonging to list with list_id
# # """
# def list_tasks():
# 	# Query list's tasks
# 	# Return JSON object containing list's tasks
