from datetime import datetime

from hackernews import HackerNews


class HackerNewsGatherer:
    def __init__(self):
        self.hn = HackerNews()

    def top_stories(self):
        top = self.hn.top_stories()[0:10]
        return list(filter(lambda i: i is not None, map(self._format_item, map(self.hn.item, top))))

    def _format_item(self, item):
        res = {**item.__dict__}
        for k, v in res.items():
            if isinstance(v, datetime):
                res[k] = v.timestamp()
        return res
