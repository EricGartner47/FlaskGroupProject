from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Task
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


@user_routes.route('/<int:id>/tasks')
@login_required
def get_all_tasks(id):
    user = User.query.get(id)
    results = Task.query.filter(Task.user_id == user.id).all()
    return {'tasks': [task.to_dict() for task in results]}

@user_routes.route('/<int:id>/tasks', methods=['POST'])
@login_required
def create_task(id):
    user = User.query.get(id)
    form = NewTask()
    if form.validate_on_submit():
        task = Task()
        form.populate_obj(task)
        db.session.add(task)
        db.session.commit()
# not finished

@user_routes.route('/<int:id>/lists')
@login_required
def get_all_lists(id):
    user = User.query.get(id)
    results = List.query.filter(List.user_id == user.id).all()
    return {'lists': [list.to_dict() for list in results]}

@user_routes.route('/<int:id>/lists', methods=['POST'])
@login_required
def create_list(id):
    user = User.query.get(id)
    form = NewList()
    if form.validate_on_submit():
        list = List()
        form.populate_obj(list)
        db.session.add(list)
        db.session.commit()


@user_routes.route('/<int:id>/tasks/<list_id>')
# @login_required
def get_tasks_in_lists(id, list_id):
    user = User.query.get(id)
    results = Task.query.filter(Task.list_id == list_id).all()
    return {'tasks': [task.to_dict() for task in results]}

# not finished 
#update
# @user_routes.route('/<int:id>/update')
# @login_required
# # """

# # This one is one function for all updates, because
# #     on the app, it's a form that takes all the information at once.

# # function which updates user information
# #     - first_name
# #     - last_name
# #     - username?
# #     - email?
# #     - password
# # """
# def update_user_information():
#     # update user information with account settings form information upon submission
#     # return <something>


# #deactivate
# @user_routes.route('/<int:id>/deactivate')
# @login_required
# def deactivate_user_account():
    # authenticate user
    # remove accunt from database
    # returns JSON message saying "Account deleted"

