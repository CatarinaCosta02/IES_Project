from communications.protocol import Protocol

if __name__ == "__main__":
    proto = Protocol("localhost")

    # proto.send_data_request("reddit", "search", {"subreddit": "homelab", "query": "r720"})
    proto.send_data_request("hn", "top_stories")
