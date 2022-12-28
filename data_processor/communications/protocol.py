import json
from json import JSONDecodeError

from communications.communicationlayer import CommunicationLayer


class Protocol(CommunicationLayer):
    def __init__(self, host, queues):
        super().__init__(host, queues)
        self.rec_callbacks = dict()

    def _parse_payload_deco(self, fun):
        def wrapper(ch, method, properties, body):
            try:
                return fun(json.loads(body))
            except JSONDecodeError:
                print('Malformed packet: {}'.format(body))
                return None

        return wrapper

    def register_response_callback(self, callback, key):
        self.bind_response_callback(self._parse_payload_deco(callback), key)

    # ==================================== FOR TESTING ONLY ====================================
    def send_data_request(self, type_, method, payload=None):
        data = {
            "method": method,
            "type": type_
        }

        if payload is not None:
            data = {**data, **payload}

        self.send_request(json.dumps(data).encode())
