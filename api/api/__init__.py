import env
from flask import Flask, jsonify
from flask_cors import CORS
import json
import requests

app = Flask(__name__)
cors = CORS(app, resources={r'/*': {'origins': '*'}})

class WebFactionMiddleware(object):
    def __init__(self, app):
        self.app = app
    def __call__(self, environ, start_response):
        environ['SCRIPT_NAME'] = '/api'
        return self.app(environ, start_response)

app.wsgi_app = WebFactionMiddleware(app.wsgi_app)

def time_object(time, post):
    return {
      'description': post['description'],
      'time': time,
      'url': post['url'],
    }

@app.route('/episodes')
def episodes():
    url = 'https://api.tumblr.com/v2/blog/starpod.tumblr.com/posts/link?api_key=' + env.TUMBLR_KEY
    tumblr_response = requests.get(url).json()

    records = []
    episodeTitles = []

    for post in tumblr_response['response']['posts']:
        url = post['url']
        url_split = url.split('/')
        url_split_last = url_split[len(url_split)-1]
        has_time = url_split_last.find(':') > -1
        title_split = post['title'].split(' — ')
        title = title_split[0]
        podcast = title_split[1]

        if has_time:
            url = '/'.join(url_split[:-1])

        if title in episodeTitles:
            for record in records:
                if record['attributes']['title'] == title:
                    episode_obj = record
                    break

            if has_time:
                episode_obj['attributes']['times'].append(time_object(url_split_last, post))
            else:
                episode_obj['attributes']['description'] = post['description']

        else:
            obj = {
                'id': post['id'],
                'type': 'episode',
                'attributes': {
                    'times': [],
                    'title': title,
                    'podcast': podcast,
                    'url': url,
                }
            }

        if has_time:
            obj['attributes']['times'].append(time_object(url_split_last, post))
        else:
            obj['attributes']['description'] = post['description']

        records.append(obj)
        episodeTitles.append(title)

    return jsonify({ 'data': records })

if __name__ == "__main__":
    app.run()
