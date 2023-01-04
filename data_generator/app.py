import os

from communications.protocol import Protocol
from gatherers.hn import HackerNewsGatherer
from gatherers.nyt import NewYorkTimesGatherer
from gatherers.reddit import RedditGatherer


class App:
    def __init__(self):
        self.proto = Protocol(os.environ.get("RABBITMQ_HOST", "localhost"), ["reddit", "hn", "nyt"])
        self.r_gatherer = RedditGatherer({
            "username": "whatsnewies",
            "password": "m04KT5*noW9cLXQN23ob",
            "app_id": "gXMRs3t-O-zEelhDKk6HNw",
            "app_secret": "-vGqhnbU0XYYs3YSFMfrKcOFcqWOgA"
        })
        self.hn_gatherer = HackerNewsGatherer()
        self.nyt_gatherer = NewYorkTimesGatherer("6rdOeTHD75ZKNYuL5lNscWa2OnOSKmTR")

        self.proto.register_request_callback(self.search_reddit, "reddit.search")

        self.proto.register_request_callback(self.top_reddit, "reddit.top_stories")
        self.proto.register_request_callback(self.top_hn, "hn.top_stories")
        self.proto.register_request_callback(self.top_nyt, "nyt.top_stories")
        self.proto.register_request_callback(self.top_by_subreddit, "reddit.top_by_subreddit")

        self.proto.register_request_callback(self.gather_all_reddit, "reddit.gather_all")
        self.proto.register_request_callback(self.gather_all_nyt, "nyt.gather_all")

    def search_reddit(self, proto, msg):
        subreddit = msg.get("subreddit", None)
        query = msg.get("query", None)

        if query is None:
            proto.send_response("reddit", False)
            return

        news = self.r_gatherer.search(subreddit, query)
        proto.send_response("reddit", "search", news is not None, news)

    # HN gatherer
    def top_hn(self, proto, msg):
        news = self.hn_gatherer.top_stories()
        proto.send_response("hn", "top_stories", news is not None, news)

    # reddit gatherer
    def gather_all_reddit(self, proto, msg):
        news = self.r_gatherer.gather_all()
        if all(n[1] is not None for n in news):
            for resp in news:
                proto.send_response("reddit", resp[0], True, resp[1])
        else:
            proto.send_response("reddit", "gather_all", False)

    def top_reddit(self, proto, msg):
        news = self.r_gatherer.top_stories()
        proto.send_response("reddit", "top_stories", news is not None, news)

    def top_by_subreddit(self, proto, msg):
        subreddit = msg.get("subreddit", None)
        if subreddit is None:
            proto.send_response("reddit", False)
            return

        news = self.r_gatherer.top_stories_by_subreddit(subreddit)
        proto.send_response("reddit", "top_by_subreddit", news is not None, news)

    # NYT gatherer
    def top_nyt(self, proto, msg):
        news = self.nyt_gatherer.top_stories()
        proto.send_response("nyt", "top_stories", news is not None, news)

    def gather_all_nyt(self, proto, msg):
        news = self.nyt_gatherer.gather_all()
        if all(n[1] is not None for n in news):
            for resp in news:
                proto.send_response("nyt", resp[0], True, resp[1])
        else:
            proto.send_response("nyt", "gather_all", False)

    def run(self):
        self.proto.loop()
