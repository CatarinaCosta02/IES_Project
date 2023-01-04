from communications.protocol import Protocol

if __name__ == "__main__":
    proto = Protocol("localhost", ["hn", "reddit"], client=True)

    proto.register_response_callback(lambda ch, method, properties, body: print("R", body), "reddit")
    proto.register_response_callback(lambda ch, method, properties, body: print("H", body), "hn")

    for i in range(1):
        proto.send_data_request("reddit", "search", {"subreddit": "homelab", "query": "beauty"})
        proto.send_data_request("hn", "top_stories")

    proto.loop()
