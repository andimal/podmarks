import env
import json
import requests

url = 'https://api.tumblr.com/v2/blog/starpod.tumblr.com/posts/link?api_key=' + env.TUMBLR_KEY

def _get_tumblr_data(_url):
    return requests.get(_url).json()

def _time_object(time, post):
    return {
      'description': post['description'],
      'time': time,
      'url': post['url'],
    }

def _single_post(post, records=[], episode_titles=[]):
    obj = {}
    url = post['url']
    url_split = url.split('/')
    url_split_last = url_split[len(url_split)-1]
    has_time = url_split_last.find(':') > -1
    title_split = post['title'].split(' — ')
    title = title_split[0]
    podcast = title_split[1]

    if has_time:
        url = '/'.join(url_split[:-1])

    if title in episode_titles:
        for record in records:
            if record and record['attributes']['title'] == title:
                episode_obj = record
                break

        if has_time:
            episode_obj['attributes']['times'].append(_time_object(url_split_last, post))
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
            obj['attributes']['times'].append(_time_object(url_split_last, post))
        else:
            obj['attributes']['description'] = post['description']

    return { 'obj': obj, 'title': title }


#
# grab all tumblr data, write json
#
def get_data():
    tumblr_response = _get_tumblr_data(url)
    posts = tumblr_response['response']['blog']['posts']

    # tumblr limits responses to 20; this gets the needed loop count
    if posts % 20 > 0:
    	loop_num = (posts // 20) + 2
    else:
    	loop_num = posts // 20 + 1

    records = []
    episode_titles = []

    for x in range(0,loop_num):
        y = x * 20
        tumblr_paged_response = _get_tumblr_data(url + '&offset=' + str(y))
        for post in tumblr_paged_response['response']['posts']:
            p = _single_post(post, records, episode_titles)

            if 'id' in p['obj']:
                records.append(p['obj'])
                episode_titles.append(p['title'])

    file = open(env.EPISODES_FILE,'w')
    file.write(json.dumps({ 'data': records }))
    file.close()


#
# prepend new post to json
#
def new_post():
    file = open(env.EPISODES_FILE,'r+')
    episodes = json.loads(file.read())['data']

    tumblr_response = _get_tumblr_data(url)

    for post in tumblr_response['response']['posts']:
        in_episodes = [ep for ep in episodes if ep.get('id')==post['id']]
        if len(in_episodes):
            break
        else:
            p = _single_post(post)
            if 'id' in p['obj']:
                episodes.insert(0, p['obj'])

    file.seek(0)
    file.truncate()
    file.write(json.dumps({ 'data': episodes }))
    file.close()
