import os
import time

import redis as redis
import requests


class RedditGatherer:
    def __init__(self, config):
        self.password = config.get("password")
        self.username = config.get("username")
        self.app_id = config.get("app_id")
        self.app_secret = config.get("app_secret")

        self.auth = self._authenticate()
        self.redis = redis.Redis(host=os.environ.get("REDIS_HOST", "localhost"), port=6379)

        self.THRESHOLD = 5  # in news

    def in_cache(self, item):
        if not self.redis.sismember("reddit", item["id"]):
            self.redis.sadd("reddit", item["id"])
            return False
        return True

    def search(self, subreddit, query):
        if self.auth[1] + 1.5 * 60 * 60 < time.time():
            self.auth = self._authenticate()

        payload = {
            "q": query,
            "restrict_sr": "on",
            "sort": "relevance",
            "t": "all",
            "limit": 4 * self.THRESHOLD
        }
        headers = {'User-Agent': f'WhatsNew/0.1 by {self.username}', 'Authorization': f'bearer {self.auth[0]}'}
        if subreddit is not None:
            data = requests.get(f"https://oauth.reddit.com/r/{subreddit}/search", headers=headers, params=payload).json()
            data["data"]["children"].filter(lambda i: i is not None and not self.in_cache(i))

            it = 0
            while len(data["data"]["children"]) < self.THRESHOLD and it < 5:
                payload["after"] = data["data"]["after"]
                new_data = requests.get(f"https://oauth.reddit.com/r/{subreddit}/search", headers=headers, params=payload).json()
                data["data"]["children"] += list(filter(lambda i: i is not None and not self.in_cache(i), new_data["data"]["children"]))
                data["data"]["after"] = new_data["data"]["after"]
                it += 1

            return data

        data = requests.get(f"https://oauth.reddit.com/search", headers=headers, params=payload).json()
        data["data"]["children"] = list(filter(lambda i: i is not None and not self.in_cache(i["data"]), data["data"]["children"]))

        it = 0
        while len(data["data"]["children"]) < self.THRESHOLD and it < 5:
            payload["after"] = data["data"]["after"]
            new_data = requests.get(f"https://oauth.reddit.com/search", headers=headers, params=payload).json()
            data["data"]["children"] += list(filter(lambda i: i is not None and not self.in_cache(i), new_data["data"]["children"]))
            data["data"]["after"] = new_data["data"]["after"]
            it += 1

        return data

    def top_stories(self):
        if self.auth[1] + 1.5 * 60 * 60 < time.time():
            self.auth = self._authenticate()

        payload = {
            "t": "all",
            "limit": 4 * self.THRESHOLD
        }
        headers = {'User-Agent': f'WhatsNew/0.1 by {self.username}', 'Authorization': f'bearer {self.auth[0]}'}
        data = requests.get(f"https://oauth.reddit.com/top", headers=headers, params=payload).json()
        data["data"]["children"] = list(filter(lambda i: i is not None and not self.in_cache(i["data"]), data["data"]["children"]))

        it = 0
        while len(data["data"]["children"]) < self.THRESHOLD and it < 5:
            payload["after"] = data["data"]["after"]
            new_data = requests.get(f"https://oauth.reddit.com/top", headers=headers, params=payload).json()
            data["data"]["children"] += list(filter(lambda i: i is not None and not self.in_cache(i["data"]), new_data["data"]["children"]))
            data["data"]["after"] = new_data["data"]["after"]
            it += 1

        return data

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
