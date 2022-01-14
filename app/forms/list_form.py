from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length

class ListForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(), Length(1, 200, message='List of name should be 200 characters or fewer')])
    user_id = IntegerField('user_id', validators=[DataRequired()])
