from flask_wtf import FlaskForm
from wtforms import (IntegerField,
                     SubmitField,
                     )
from wtforms.validators import InputRequired


class PrizePool(FlaskForm):
    prize = IntegerField(validators=[InputRequired(message='Pleae enter total prize pool.')])
    submit = SubmitField('Submit')
