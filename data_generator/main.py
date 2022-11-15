from gatherers.reddit import RedditGatherer
from gatherers.hn import HackerNewsGatherer

if __name__ == "__main__":
    r_gatherer = RedditGatherer({
        "username": "whatsnewies",
        "password": "m04KT5*noW9cLXQN23ob",
        "app_id": "gXMRs3t-O-zEelhDKk6HNw",
        "app_secret": "-vGqhnbU0XYYs3YSFMfrKcOFcqWOgA"
    })
    hn_gatherer = HackerNewsGatherer()

    with open("test", "w") as f:
        f.write(r_gatherer.gather("homelab", "beauty").decode("utf-8"))

    with open("test2", "w") as f:
        f.write(str(hn_gatherer.gather()))
