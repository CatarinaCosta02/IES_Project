package com.whatsnew.api.api;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.whatsnew.api.MQ.Config;
import com.whatsnew.api.error.RuntimeError;
import jakarta.websocket.server.PathParam;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Routes {
    @Autowired
    RabbitTemplate rabbit;

    @GetMapping("/api/search")
    public String HelloRabbit(@PathParam("topic") String topic, @PathParam("title") String title,
                              @PathParam("country") String country) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();

        if (title == null) {
            return mapper.writeValueAsString(new RuntimeError("No query provided"));
        }

        if (topic == null) {
            topic = "*";
        }

        if (country == null) {
            country = "*";
        }

        SearchQuery sq = new SearchQuery(topic, title, country);
        ApiRequest ar = new ApiRequest("SEARCH", sq);
        return (String) rabbit.convertSendAndReceive(Config.EXCHANGE, Config.QUEUE_API, mapper.writeValueAsString(ar));
    }

}
