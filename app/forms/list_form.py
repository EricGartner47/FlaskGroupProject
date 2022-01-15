from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError

def list_length(form, field):
    # Checking if password matches
    name = form.data['name']
    if len(name) > 200:
        raise ValidationError('List must be 200 characters or fewer.')
    if len(name) == 0:
        raise ValidationError('List name is required.')



class ListForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(), list_length])
    user_id = IntegerField('user_id', validators=[DataRequired()])
