import json
import datetime

from models import loader


class NewYorkTimesProtocol:
    def __init__(self, receive_protocol):
        self.connection = receive_protocol.connection
        self.channel = self.connection.channel()

        self.channel.exchange_declare(exchange='finished_data')

        self.channel.queue_declare(queue='nyt', durable=True)
        self.channel.queue_bind(exchange='finished_data', queue='nyt')

    def process(self, data):
        if not data["success"]:
            byte_data = json.dumps({
                "kind": data["method"],
                "payload": [],
                "success": False
            }).encode("utf-8")
            self.channel.basic_publish(exchange='finished_data', routing_key='nyt', body=byte_data)
            return


        useful_data = data["payload"]["results"]
        treated_data = []

        for item in useful_data:
            topic = item.get("__topic", None)
            source = "NYT." + topic if topic is not None else "NYT"

            if all(key in item for key in ("title", "byline", "url", "abstract", "created_date")):
                sentiment = loader.predict(item["abstract"])

                treated_data.append({
                    "title": item["title"],
                    "author": item["byline"],
                    "permalink": item["url"],
                    "summary": item["abstract"],
                "topic": data["payload"].get("topic", None),
                "country": data["payload"].get("country", None),
                    "created": datetime.datetime.fromisoformat(item["created_date"]).timestamp(),
                    "sentiment": sentiment,
                    "source": source,
                })

        byte_data = json.dumps({
            "kind": data["method"],
            "payload": treated_data,
            "success": True
        }).encode("utf-8")
        self.channel.basic_publish(exchange='finished_data', routing_key='nyt', body=byte_data)
