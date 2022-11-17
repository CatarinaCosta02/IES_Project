from communications.Protocol import Protocol
from gatherers.hn import HackerNewsGatherer
from gatherers.reddit import RedditGatherer


class App:
    def __init__(self):
        self.proto = Protocol("localhost")
        self.r_gatherer = RedditGatherer({
            "username": "whatsnewies",
            "password": "m04KT5*noW9cLXQN23ob",
            "app_id": "gXMRs3t-O-zEelhDKk6HNw",
            "app_secret": "-vGqhnbU0XYYs3YSFMfrKcOFcqWOgA"
        })
        self.hn_gatherer = HackerNewsGatherer()

        self.proto.register_request_callback(self.search_reddit, "reddit.search")
        self.proto.register_request_callback(self.top_hn, "hn.top_stories")

    def search_reddit(self, proto, msg):
        subreddit = msg.get("subreddit", None)
        query = msg.get("query", None)

        if query is None:
            proto.send_response("reddit", False)
            return

        proto.send_response("reddit", True, self.r_gatherer.search(subreddit, query))

    def top_hn(self, proto, msg):
        proto.send_response("hn", True, self.hn_gatherer.top_stories())

    def run(self):
        self.proto.loop()
