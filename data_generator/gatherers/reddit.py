import os
import time

import pathos as pathos
import redis as redis
import requests


class RedditGatherer:
    SUBREDDITS_TO_SCAN = [
        "portugal",
        "usanews",
        "italy",
        "poland",
        "french",
        "england",
        "spain",
        "brasil",
        "china",
        "austria",
        "argentina",
        "australia",
        "newzealand",
        "germany",
        "canada",
        "technology",
        "movies",
        "sports",
        "health",
        "politics",
        "science",
        "business",
        "fashion"
    ]

    def __init__(self, config):
        self.password = config.get("password")
        self.username = config.get("username")
        self.app_id = config.get("app_id")
        self.app_secret = config.get("app_secret")

        self.auth = None
        self.redis = redis.Redis(host=os.environ.get("REDIS_HOST", "localhost"), port=6379)

        self.THRESHOLD = 5  # in news

    def in_cache(self, item):
        if not self.redis.sismember("reddit", item["id"]):
            self.redis.sadd("reddit", item["id"])
            return False
        return True


    def hit_api(self, url, payload):
        if self.auth is None or self.auth[1] + 1.5 * 60 * 60 < time.time():
            auth = self._authenticate()
            if auth is None:
                return None
            self.auth = auth

        headers = {'User-Agent': f'WhatsNew/0.1 by {self.username}', 'Authorization': f'Bearer {self.auth[0]}'}
        try:
            r = requests.get(url, headers=headers, params=payload)
            return r.json()
        except:
            return None

    def search(self, subreddit, query):
        payload = {
            "q": query,
            "restrict_sr": "on",
            "sort": "relevance",
            "t": "all",
            "limit": 4 * self.THRESHOLD
        }

        if subreddit is not None:
            data = self.hit_api(f"https://oauth.reddit.com/r/{subreddit}/search", payload)
            if data is None:
                return None

            data["data"]["children"].filter(lambda i: i is not None and not self.in_cache(i))

            it = 0
            while len(data["data"]["children"]) < self.THRESHOLD and it < 5:
                payload["after"] = data["data"]["after"]
                new_data = self.hit_api(f"https://oauth.reddit.com/r/{subreddit}/search", payload)
                if new_data is None:
                    break

                data["data"]["children"] += list(filter(lambda i: i is not None and not self.in_cache(i), new_data["data"]["children"]))
                data["data"]["after"] = new_data["data"]["after"]
                it += 1

            return data

        data = self.hit_api(f"https://oauth.reddit.com/search", payload)
        if data is None:
            return None

        data["data"]["children"] = list(filter(lambda i: i is not None and not self.in_cache(i["data"]), data["data"]["children"]))

        it = 0
        while len(data["data"]["children"]) < self.THRESHOLD and it < 5:
            payload["after"] = data["data"]["after"]
            new_data = self.hit_api(f"https://oauth.reddit.com/search", payload)
            if new_data is None:
                break

            data["data"]["children"] += list(filter(lambda i: i is not None and not self.in_cache(i), new_data["data"]["children"]))
            data["data"]["after"] = new_data["data"]["after"]
            it += 1

        return data

    def top_stories(self, _=None):
        payload = {
            "t": "all",
            "limit": 4 * self.THRESHOLD
        }
        data = self.hit_api("https://oauth.reddit.com/top", payload)
        if data is None:
            return None

        data["data"]["children"] = list(filter(lambda i: i is not None and not self.in_cache(i["data"]), data["data"]["children"]))

        it = 0
        while len(data["data"]["children"]) < self.THRESHOLD and it < 5:
            payload["after"] = data["data"]["after"]
            new_data = self.hit_api("https://oauth.reddit.com/top", payload)
            if new_data is None:
                break

            data["data"]["children"] += list(filter(lambda i: i is not None and not self.in_cache(i["data"]), new_data["data"]["children"]))
            data["data"]["after"] = new_data["data"]["after"]
            it += 1

        return data

    def top_stories_by_subreddit(self, subreddit):
        payload = {
            "t": "all",
            "limit": 4 * self.THRESHOLD
        }
        data = self.hit_api(f"https://oauth.reddit.com/r/{subreddit}/top", payload)
        if data is None:
            return None

        data["data"]["children"] = list(filter(lambda i: i is not None and not self.in_cache(i["data"]), data["data"]["children"]))
        data["__subreddit"] = subreddit
        it = 0
        while len(data["data"]["children"]) < self.THRESHOLD and it < 5:
            payload["after"] = data["data"]["after"]
            new_data = self.hit_api(f"https://oauth.reddit.com/r/{subreddit}/top", payload)
            if new_data is None:
                break

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

        try:
            response = requests.post('https://www.reddit.com/api/v1/access_token', auth=auth, data=data, headers=headers)
            return response.json()["access_token"], time.time()
        except:
            return None

    def gather_all(self):
        data = []
        with pathos.multiprocessing.ProcessingPool(nodes=len(self.SUBREDDITS_TO_SCAN) // 2 + 1) as pool:
            data += map(lambda res: ("top_stories", res), pool.map(self.top_stories, [None]))
            data += map(lambda res: ("top_by_subreddit", res), pool.map(self.top_stories_by_subreddit, self.SUBREDDITS_TO_SCAN))
        return data
