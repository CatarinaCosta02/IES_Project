import pika


class CommunicationLayer:
    def __init__(self, host, queues):
        self.host = host
        self.connection = pika.BlockingConnection(pika.ConnectionParameters(host))
        self.channel = self.connection.channel()
        self.channel.basic_qos(prefetch_count=1)

        self.channel.exchange_declare(exchange='data_gen')

        self.channel.queue_declare(queue='requests', durable=True)
        self.channel.queue_bind(exchange='data_gen', queue='requests')

        for queue in queues:
            self.channel.queue_declare(queue=f'responses.{queue}', durable=True)
            self.channel.queue_bind(exchange='data_gen', queue=f'responses.{queue}')

    def bind_request_callback(self, callback):
        self.channel.basic_consume(
            queue='requests', on_message_callback=callback)

    def bind_reddit_response_callback(self, callback):
        self.channel.basic_consume(
            queue='responses.reddit', on_message_callback=callback, auto_ack=True)

    def bind_hn_response_callback(self, callback):
        self.channel.basic_consume(
            queue='responses.hn', on_message_callback=callback, auto_ack=True)

    def send_request(self, payload):
        self.channel.basic_publish(exchange='data_gen', routing_key='requests', body=payload)

    def send_response_to_queue(self, response, queue):
        self.channel.basic_publish(exchange='data_gen', routing_key=f'responses.{queue}', body=response)

    def loop(self):
        self.channel.start_consuming()
        self._close()

    def _close(self):
        self.connection.close()
