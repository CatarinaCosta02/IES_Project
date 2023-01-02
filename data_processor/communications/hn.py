import json
import pika

from models import loader


class HNProtocol:
    def __init__(self, receive_protocol):
        self.connection = receive_protocol.connection
        self.channel = self.connection.channel()

        self.channel.exchange_declare(exchange='finished_data')

        self.channel.queue_declare(queue='hn', durable=True)
        self.channel.queue_bind(exchange='finished_data', queue='hn')

    def process(self, data):
        if not data["success"]:
            byte_data = json.dumps({
                "kind": data["method"],
                "payload": [],
                "success": False
            }).encode("utf-8")
            self.channel.basic_publish(exchange='finished_data', routing_key='hn', body=byte_data)
            return

        useful_data = data["payload"]
        treated_data = []

        for item in useful_data:
            if all(key in item for key in ("title", "by", "url", "score", "time")):
                sentiment = loader.predict(item["title"])

                treated_data.append({
                    "title": item["title"],
                    "author": item["by"],
                    "score": item["score"],
                    "permalink": item["url"],
                    "created": item["time"],
                    "sentiment": sentiment,
                    "topic": None,
                    "country": None,
                    "source": "HN"
                })

        bytes_data = json.dumps({
            "kind": data["method"],
            "payload": treated_data,
            "success": True
        }).encode("utf-8")

        self.channel.basic_publish(exchange='finished_data', routing_key='hn', body=bytes_data)
