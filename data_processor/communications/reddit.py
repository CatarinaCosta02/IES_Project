import json
import pika


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

            treated_data.append({
                "title": item["data"]["title"],
                "author": item["data"]["author"],
                "score": item["data"]["score"],
                "permalink": "reddit.com" + item["data"]["permalink"],
                "num_comments": item["data"]["num_comments"],
                "created": item["data"]["created_utc"],
                "source": source
            })

        byte_data = json.dumps({
            "kind": data["method"],
            "payload": treated_data,
            "success": True
        }).encode("utf-8")
        self.channel.basic_publish(exchange='finished_data', routing_key='reddit', body=byte_data)
