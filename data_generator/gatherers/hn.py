from hackernews import HackerNews


class HackerNewsGatherer:
    def __init__(self):
        self.hn = HackerNews()

    def gather(self):
        top = self.hn.top_stories()[0:100]
        return [self.hn.item(i) for i in top]
