import json
from json import JSONDecodeError

from communications.communicationlayer import CommunicationLayer


class Protocol(CommunicationLayer):
    def __init__(self, host):
        super().__init__(host)
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
        if key == "reddit":
            self.bind_reddit_response_callback(self._parse_payload_deco(callback))
        elif key == "hn":
            self.bind_hn_response_callback(self._parse_payload_deco(callback))

    def send_response(self, type_, method, success, payload=None):
        data = {
            "success": success,
            "method": method
        }

        if payload is not None:
            data["payload"] = payload

        if type_ == "reddit":
            self.send_reddit_response(json.dumps(data).encode())
        elif type_ == "hn":
            self.send_hn_response(json.dumps(data).encode())
        else:
            print("Invalid type: {}".format(type_))

    # ==================================== FOR TESTING ONLY ====================================
    def send_data_request(self, type_, method, payload=None):
        data = {
            "method": method,
            "type": type_
        }

        if payload is not None:
            data = {**data, **payload}

        self.send_request(json.dumps(data).encode())
