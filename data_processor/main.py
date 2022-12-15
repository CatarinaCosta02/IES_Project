import os
from pprint import pprint

from communications.nyt import NewYorkTimesProtocol
from communications.protocol import Protocol
from communications.hn import HNProtocol
from communications.reddit import RedditProtocol

if __name__ == "__main__":
    proto = Protocol(os.environ.get("RABBITMQ_HOST", "localhost"), ["reddit", "hn", "nyt"])
    reddit_parser = RedditProtocol(proto)
    hn_parser = HNProtocol(proto)
    nyt_parser = NewYorkTimesProtocol(proto)

    proto.register_response_callback(reddit_parser.process, "reddit")
    proto.register_response_callback(hn_parser.process, "hn")
    proto.register_response_callback(nyt_parser.process, "nyt")

    proto.loop()
