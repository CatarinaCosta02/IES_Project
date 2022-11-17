from hackernews import HackerNews


class HackerNewsGatherer:
    def __init__(self):
        self.hn = HackerNews()

    def top_stories(self):
        top = self.hn.top_stories()[0:10]
        return list(filter(lambda i: i is not None, map(self._format_item, map(self.hn.item, top))))

    def _format_item(self, item):
        if "url" in item.__dict__:
            return {
                "title": item.title,
                "url": item.url,
                "author": item.by,
                "type": "link"
            }
        return None
