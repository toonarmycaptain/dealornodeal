import json

from flask import (Blueprint,
                   redirect,
                   request,
                   render_template,
                   session,
                   url_for,
                   )
from flask_wtf.csrf import CSRFError

from dealornodeal.amounts import my_proportions
from dealornodeal.setup_form import PrizePool
bp = Blueprint("game", __name__)


@bp.route('/', methods=['GET'])
def base_url():
    """Redirect bare url to home/setup page."""
    return redirect(url_for('game.setup'), code=301)


@bp.route('/setup/', methods=['GET', 'POST'])
def setup():
    """Game setup."""
    form = PrizePool()
    if request.method == 'POST' and form.validate_on_submit():
        prize_pool = form.prize.data
        session['prize_pool'] = prize_pool
        return redirect(url_for('game.play'))
    # else:
    return render_template('setup.html', form=form)


@bp.route('/play/', methods=['GET'])
def play():
    """Home page."""
    try:
        prize_pool = session['prize_pool']
        prizes = [round(proportion * prize_pool, 2) for proportion in my_proportions]
    except KeyError:
        prizes = None
    return render_template('index.html', prizes=json.dumps(prizes))


@bp.errorhandler(CSRFError)
def handle_csrf_error(e):
    """
    Redirects user to requested page in event of CSRF Error.

    Assumes all routes are under my_site blueprint.
    Assumes all route functions have same name as their url.
    """
    return redirect(url_for(f'game.{request.path[1:-1]}'))
