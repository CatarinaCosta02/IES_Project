from communications.protocol import Protocol

if __name__ == "__main__":
    proto = Protocol("localhost")

    proto.register_request_callback(lambda p: p.send_response("reddit", True, "REDDIT GATHER"), "reddit.gather")
    proto.register_request_callback(lambda p: p.send_response("hn", True, "HACKER NEWS GATHER"), "hn.gather")

    proto.loop()
