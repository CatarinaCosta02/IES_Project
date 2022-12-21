import pathos as pathos
import redis as redis
import requests
import os


class NewYorkTimesGatherer:
    TOPICS = [
        "technology",
        "movies",
        "sports",
        "health",
        "politics",
        "science",
        "business",
        "fashion",
    ]

    def __init__(self, api_key):
        self.api_key = api_key
        self.redis = redis.Redis(host=os.environ.get("REDIS_HOST", "localhost"), port=6379)

    def in_cache(self, item):
        if not self.redis.sismember("nyt", item["uri"]):
            self.redis.sadd("nyt", item["uri"])
            return False
        return True

    def hit_api(self, url):
        try:
            resp = requests.get(url).json()
            if "results" in resp:
                return resp
            return None
        except:
            return None

    def top_stories(self, _=None):
        data = self.hit_api(f"https://api.nytimes.com/svc/topstories/v2/home.json?api-key={self.api_key}")
        if data is None:
            return None

        data["results"] = list(filter(lambda i: i is not None and not self.in_cache(i), data["results"]))
        return data

    def top_stories_in_topic(self, topic):
        data = self.hit_api(f"https://api.nytimes.com/svc/topstories/v2/{topic}.json?api-key={self.api_key}")
        if data is None:
            return None

        data["results"] = list(filter(lambda i: i is not None and not self.in_cache(i), data["results"]))
        data["topic"] = topic
        data["__topic"] = topic
        return data

    def gather_all(self):
        data = []
        with pathos.multiprocessing.ProcessingPool(8) as pool:
            data += map(lambda res: ("top_stories", res), pool.map(self.top_stories, [None]))
            data += map(lambda res: ("top_in_topic", res), pool.map(self.top_stories_in_topic, self.TOPICS))
        return data
