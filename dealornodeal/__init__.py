""" App factory """
import os

from flask import Flask
from flask_wtf.csrf import CSRFProtect

ABOUT_TEXT_STRING = (
    b'<html>'
    b'<p>Fork of <a href=https://github.com/mervyns/dealornodeal">mervyns dealornodeal</a> game.'
        
    b'Reconfigured as flask app, with configurable total prize pool.</p>'
    b'<p>The repo for the site is '
    b'<a href="https://github.com/toonarmycaptain/dealornodeal/">'
    b'dealornodeal</a>.</p>'
    b'<p>Any comments or enquiries can be directed to my '
    b'<a href="https://toonarmycaptain.pythonanywhere.com/contact/">contact page</a>, or '
    b'<a href="https://twitter.com/toonarmycaptain">toonarmycaptain</a>.</p>'
    b'</html>')


def create_app(test_config: dict = None) -> Flask:
    """
    Create application instance.

    :param test_config: dict or None
    :return: Flask
    """
    app: Flask = Flask(__name__)
    # Defaults to be overridden by instance config:

    app.config.from_pyfile('default_config.py')
    SECRET_KEY = os.urandom(512)
    app.config.update(SECRET_KEY=SECRET_KEY)

    # Load runtime config:
    if test_config is None:  # Load production config.
        app.config.from_pyfile('app_config.py')
    else:  # Load testing config:
        app.config.update(test_config)




    # Setup CSRF
    CSRF_SECRET_KEY = os.urandom(512)
    app.config.update(WTF_CSRF_SECRET_KEY=CSRF_SECRET_KEY)

    csrf = CSRFProtect(app)

    from dealornodeal import dealornodeal_app
    app.register_blueprint(dealornodeal_app.bp)

    @app.route('/about_text/')
    def about_text() -> bytes:
        """


        :return: bytes
        """
        return ABOUT_TEXT_STRING

    return app
