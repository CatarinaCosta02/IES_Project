import pika


class CommunicationLayer:
    def __init__(self, host, queues):
        self.host = host
        self.connection = pika.BlockingConnection(pika.ConnectionParameters(host))
        self.channel = self.connection.channel()
        self.channel.basic_qos(prefetch_count=1)

        self.channel.exchange_declare(exchange='data_gen')

        for queue in queues:
            self.channel.queue_declare(queue=f'responses.{queue}', durable=True)
            self.channel.queue_bind(exchange='data_gen', queue=f'responses.{queue}')

    def bind_response_callback(self, callback, queue):
        self.channel.basic_consume(
            queue=f'responses.{queue}', on_message_callback=callback, auto_ack=True)

    def send_request(self, payload):
        self.channel.basic_publish(exchange='data_gen', routing_key='requests', body=payload)

    def loop(self):
        self.channel.start_consuming()
        self._close()

    def _close(self):
        self.connection.close()
