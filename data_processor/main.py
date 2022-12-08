import os
from pprint import pprint

from communications.protocol import Protocol
from communications.hn import HNProtocol
from communications.reddit import RedditProtocol

if __name__ == "__main__":
    proto = Protocol(os.environ.get("RABBITMQ_HOST", "localhost"))
    reddit_parser = RedditProtocol(proto)
    hn_parser = HNProtocol(proto)

    proto.register_response_callback(lambda data: reddit_parser.process(data), "reddit")
    proto.register_response_callback(lambda data: hn_parser.process(data), "hn")

    proto.loop()
