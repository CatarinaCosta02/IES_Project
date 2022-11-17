import time

import requests


class RedditGatherer:
    def __init__(self, config):
        self.password = config.get("password")
        self.username = config.get("username")
        self.app_id = config.get("app_id")
        self.app_secret = config.get("app_secret")

        self.auth = self._authenticate()

    def search(self, subreddit, query):
        if self.auth[1] + 1.5 * 60 * 60 < time.time():
            self.auth = self._authenticate()

        data = {
            "q": query,
            "restrict_sr": "on",
            "sort": "relevance",
            "t": "all",
            "limit": 10
        }
        headers = {'User-Agent': f'WhatsNew/0.1 by {self.username}', 'Authorization': f'bearer {self.auth[0]}'}
        if subreddit is not None:
            return requests.get(f"https://oauth.reddit.com/r/{subreddit}/search", headers=headers, params=data).json()
        return requests.get(f"https://oauth.reddit.com/search", headers=headers, params=data).json()

    def _authenticate(self):
        auth = requests.auth.HTTPBasicAuth(self.app_id, self.app_secret)

        data = {
            'grant_type': 'password',
            'username': self.username,
            'password': self.password
        }

        headers = {'User-Agent': f'WhatsNew/0.1 by {self.username}'}
        response = requests.post('https://www.reddit.com/api/v1/access_token', auth=auth, data=data, headers=headers)
        return response.json()["access_token"], time.time()
