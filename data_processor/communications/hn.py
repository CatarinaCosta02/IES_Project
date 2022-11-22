import json
import pika


class HNProtocol:
    def __init__(self, host):
        self.host = host
        self.connection = pika.BlockingConnection(pika.ConnectionParameters(host))
        self.channel = self.connection.channel()

        self.channel.exchange_declare(exchange='finished_data')

        self.channel.queue_declare(queue='hn', durable=True)
        self.channel.queue_bind(exchange='finished_data', queue='hn')

    def process(self, data):
        useful_data = data["payload"]
        treated_data = []

        for item in useful_data:
            treated_data.append({
                "title": item["title"],
                "author": item["by"],
                "score": item["score"],
                "permalink": item["url"],
                "num_comments": item["descendants"],
                "created": item["time"]
            })

        bytes_data = json.dumps({
            "kind": data["kind"],
            "payload": treated_data,
            "success": True
        }).encode("utf-8")

        self.channel.basic_publish(exchange='finished_data', routing_key='hn', body=bytes_data)
