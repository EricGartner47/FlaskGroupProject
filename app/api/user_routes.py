from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User

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

