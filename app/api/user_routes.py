from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Task

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
    form = Task()
    # if form.validate_on_submit():
    #     = ()
    #     form.populate_obj()
    #     db.session.add()
    #     db.session.commit()
