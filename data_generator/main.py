from app import App
from gatherers.reddit import RedditGatherer
from gatherers.hn import HackerNewsGatherer

if __name__ == "__main__":
    app = App()
    app.run()
