from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, DateField, SubmitField, IntegerField, TimeField
from wtforms.validators import DataRequired

class TaskForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    user_id = IntegerField('user_id', validators=[DataRequired()])
    notes = StringField('notes')
    due_date = DateField('due_date')
    completed = BooleanField('completed')
    completed_date = DateField('completed_date')
    list_id = IntegerField('list_id')
