import redis as redis
import requests
import os


class NewYorkTimesGatherer:
    def __init__(self, api_key):
        self.api_key = api_key
        self.redis = redis.Redis(host=os.environ.get("REDIS_HOST", "localhost"), port=6379)

    def in_cache(self, item):
        if not self.redis.sismember("nyt", item["uri"]):
            self.redis.sadd("nyt", item["uri"])
            return False
        return True

    def top_stories(self):
        data = requests.get(f"https://api.nytimes.com/svc/topstories/v2/home.json?api-key={self.api_key}").json()
        data["results"] = list(filter(lambda i: i is not None and not self.in_cache(i), data["results"]))
        return data
