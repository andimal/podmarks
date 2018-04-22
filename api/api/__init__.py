import env
from flask import Flask
from flask_cors import CORS
import get_data

app = Flask(__name__)
cors = CORS(app, resources={r'/*': {'origins': '*'}})

class WebFactionMiddleware(object):
    def __init__(self, app):
        self.app = app
    def __call__(self, environ, start_response):
        environ['SCRIPT_NAME'] = '/api'
        return self.app(environ, start_response)

app.wsgi_app = WebFactionMiddleware(app.wsgi_app)

def _json_response(data):
    response = app.response_class(
        response=data,
        status=200,
        mimetype='application/json'
    )
    return response


@app.route('/episodes')
def episodes():
    file = open(env.EPISODES_FILE,'r')
    data = file.read()
    file.close()
    return _json_response(data)

@app.route('/new-post')
def new_post():
    get_data.new_post()
    return _json_response({})

if __name__ == "__main__":
    app.run()
