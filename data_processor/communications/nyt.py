import json


class NewYorkTimesProtocol:
    def __init__(self, receive_protocol):
        self.connection = receive_protocol.connection
        self.channel = self.connection.channel()

        self.channel.exchange_declare(exchange='finished_data')

        self.channel.queue_declare(queue='nyt', durable=True)
        self.channel.queue_bind(exchange='finished_data', queue='nyt')

    def process(self, data):
        useful_data = data["payload"]["results"]
        treated_data = []

        for item in useful_data:
            treated_data.append({
                "title": item["title"],
                "author": item["byline"],
                "permalink": item["url"],
                "num_comments": item["num_comments"],
                "created": item["created_date"]
            })

        byte_data = json.dumps({
            "kind": data["method"],
            "payload": treated_data,
            "success": True
        }).encode("utf-8")
        self.channel.basic_publish(exchange='finished_data', routing_key='nyt', body=byte_data)