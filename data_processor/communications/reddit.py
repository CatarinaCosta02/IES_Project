import json
import pika

from models import loader


class RedditProtocol:
    def __init__(self, receive_protocol):
        self.connection = receive_protocol.connection
        self.channel = self.connection.channel()

        self.channel.exchange_declare(exchange='finished_data')

        self.channel.queue_declare(queue='reddit', durable=True)
        self.channel.queue_bind(exchange='finished_data', queue='reddit')

    def process(self, data):
        if not data["success"]:
            byte_data = json.dumps({
                "kind": data["method"],
                "payload": [],
                "success": False
            }).encode("utf-8")
            self.channel.basic_publish(exchange='finished_data', routing_key='reddit', body=byte_data)
            return

        useful_data = data["payload"]["data"]["children"]
        treated_data = []
        for item in useful_data:
            subreddit = data["payload"].get("__subreddit", None)
            source = "Reddit." + subreddit if subreddit is not None else "Reddit"

            if all(key in item["data"] for key in ("title", "author", "permalink", "score", "created_utc", "num_comments")):
                sentiment = loader.predict(item["data"]["title"])

                treated_data.append({
                    "title": item["data"]["title"],
                    "author": item["data"]["author"],
                    "score": item["data"]["score"],
                    "permalink": "reddit.com" + item["data"]["permalink"],
                    "num_comments": item["data"]["num_comments"],
                    "created": item["data"]["created_utc"],
                    "topic": data["payload"].get("topic", None),
                    "sentiment": sentiment,
                    "country": data["payload"].get("country", None),
                    "source": source
                })

        byte_data = json.dumps({
            "kind": data["method"],
            "payload": treated_data,
            "success": True
        }).encode("utf-8")
        self.channel.basic_publish(exchange='finished_data', routing_key='reddit', body=byte_data)
