import os
from datetime import datetime

import pathos as pathos
import redis as redis
from hackernews import HackerNews


class HackerNewsGatherer:
    def __init__(self):
        self.hn = HackerNews()
        self.redis = redis.Redis(host=os.environ.get("REDIS_HOST", "localhost"), port=6379, db=0)

    def in_cache(self, item):
        if not self.redis.sismember("hn", item["id"]):
            self.redis.sadd("hn", item["id"])
            return False
        return True

    def top_stories(self):
        """
        top = self.hn.top_stories()[:50]
        return list(filter(lambda i: i is not None and not self.in_cache(i), map(self._format_item, map(self.hn.item, top))))
        """
        data = []
        with pathos.multiprocessing.Pool(20) as p:
            data += p.map(self._format_item, p.map(self.hn.item, self.hn.top_stories()))

        with pathos.multiprocessing.Pool(20) as p:
            data = list(filter(lambda itm: itm is not None, p.map(self.filter, data)))

        return data

    def _format_item(self, item):
        res = {**item.__dict__}
        for k, v in res.items():
            if isinstance(v, datetime):
                res[k] = v.timestamp()
        return res

    def filter(self, item):
        return item if item is not None and not self.in_cache(item) else None
