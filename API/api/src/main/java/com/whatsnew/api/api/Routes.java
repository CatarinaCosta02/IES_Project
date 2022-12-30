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
    public String HelloRabbit(@PathParam("title") String title, @PathParam("topic") String topic, @PathParam("country") String country) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        if (title == null) {
            return mapper.writeValueAsString(new RuntimeError("No query provided"));
        }

        SearchQuery sq = new SearchQuery(title, topic, country);
        ApiRequest ar = new ApiRequest("SEARCH", sq);
        return (String) rabbit.convertSendAndReceive(Config.EXCHANGE, Config.QUEUE_API, mapper.writeValueAsString(ar));
    }

    @GetMapping("/api/search/countries")
    public String getNewsFromCountry(@PathParam("country") String country) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        if (country == null) {
            return mapper.writeValueAsString(new RuntimeError("No query provided"));
        }

        SearchQuery sq = new SearchQuery(null,null, country);
        ApiRequest ar = new ApiRequest("SEARCH_BY_COUNTRY", sq);
        return (String) rabbit.convertSendAndReceive(Config.EXCHANGE, Config.QUEUE_API, mapper.writeValueAsString(ar));
    }

    @GetMapping("/api/search/topics")
    public String getNewsWithTopic(@PathParam("topic") String topic) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        if (topic == null) {
            return mapper.writeValueAsString(new RuntimeError("No query provided"));
        }

        SearchQuery sq = new SearchQuery(null, topic, null);
        ApiRequest ar = new ApiRequest("SEARCH_BY_TOPIC", sq);
        return (String) rabbit.convertSendAndReceive(Config.EXCHANGE, Config.QUEUE_API, mapper.writeValueAsString(ar));
    }

}
