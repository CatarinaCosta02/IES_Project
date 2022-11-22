import pika


class CommunicationLayer:
    def __init__(self, host):
        self.host = host
        self.connection = pika.BlockingConnection(pika.ConnectionParameters(host))
        self.channel = self.connection.channel()

        self.channel.exchange_declare(exchange='data_gen')

        self.channel.queue_declare(queue='responses.reddit', durable=True)
        self.channel.queue_bind(exchange='data_gen', queue='responses.reddit')

        self.channel.queue_declare(queue='responses.hn', durable=True)
        self.channel.queue_bind(exchange='data_gen', queue='responses.hn')

    def bind_reddit_response_callback(self, callback):
        self.channel.basic_consume(
            queue='responses.reddit', on_message_callback=callback, auto_ack=True)

    def bind_hn_response_callback(self, callback):
        self.channel.basic_consume(
            queue='responses.hn', on_message_callback=callback, auto_ack=True)

    def send_request(self, payload):
        self.channel.basic_publish(exchange='data_gen', routing_key='requests', body=payload)

    def send_reddit_response(self, response):
        self.channel.basic_publish(exchange='data_gen', routing_key='responses.reddit', body=response)

    def send_hn_response(self, response):
        self.channel.basic_publish(exchange='data_gen', routing_key='responses.hn', body=response)

    def loop(self):
        self.channel.start_consuming()
        self._close()

    def _close(self):
        self.connection.close()
