import json
from json import JSONDecodeError

from communications.communicationlayer import CommunicationLayer


class Protocol(CommunicationLayer):
    def __init__(self, host, queues, client=False):
        super().__init__(host, queues)
        self.rec_callbacks = dict()
        if not client:
            self.bind_request_callback(self._general_callback)

    def register_request_callback(self, callback, key):
        self.rec_callbacks[key] = callback

    def register_response_callback(self, callback, key):
        if key == "reddit":
            self.bind_reddit_response_callback(callback)
        elif key == "hn":
            self.bind_hn_response_callback(callback)

    def send_response(self, type_, method, success, payload=None):
        data = {
            "success": success,
            "method": method
        }

        if payload is not None:
            data["payload"] = payload

        self.send_response_to_queue(json.dumps(data).encode(), type_)

    def send_data_request(self, type_, method, payload=None):
        data = {
            "method": method,
            "type": type_
        }

        if payload is not None:
            data = {**data, **payload}

        self.send_request(json.dumps(data).encode())

    def _general_callback(self, ch, method, properties, body):
        try:
            body = json.loads(body)
            self.verify_request(body, ["method", "type"])

            key = body["type"] + "." + body["method"]
            if key in self.rec_callbacks:
                self.rec_callbacks[key](self, body)
            else:
                print("Invalid method '{}' for type {}".format(body["method"], body["type"]))
        except JSONDecodeError:
            print('Malformed packet: {}'.format(body))
        except ValueError:
            print('Malformed request: {}'.format(body))
        finally:
            ch.basic_ack(delivery_tag=method.delivery_tag)

    @staticmethod
    def verify_request(body, required):
        if any(r not in body for r in required):
            raise ValueError
