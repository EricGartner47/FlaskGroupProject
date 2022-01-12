from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, DateTimeField, SubmitField, IntegerField
from wtforms.validators import DataRequired

class TaskForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    user_id = IntegerField('user_id', validators=[DataRequired()])
    notes = StringField('notes')
    due_date = DateTimeField('due_date')
    completed = BooleanField('completed')
    completed_date = DateTimeField('completed')
