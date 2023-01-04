package com.whatsnew.api.api;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.whatsnew.api.MQ.Config;
import com.whatsnew.api.error.RuntimeError;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import jakarta.websocket.server.PathParam;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
public class Routes {
    @Autowired
    RabbitTemplate rabbit;

    @Operation(summary = "Get the result news after advanced search",
            description = "Search can be made by words in title and then by choosing the topic and/or country")
    @Parameter(name = "title", description = "The title of the news", required = true)
    @Parameter(name = "topic", description = "The topic of the news", required = false)
    @Parameter(name = "country", description = "The country of the news", required = false)
    @GetMapping("/api/search")
    public String getNewsAfterAdvancedSearch(@PathParam("title") String title, @PathParam("topic") Optional<String> topic, @PathParam("country") Optional<String> country) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        if (title == null) {
            return mapper.writeValueAsString(new RuntimeError("No query provided"));
        }

        SearchQuery sq = new SearchQuery(title, topic.orElse(null), country.orElse(null));
        ApiRequest ar = new ApiRequest("SEARCH", sq);
        return (String) rabbit.convertSendAndReceive(Config.EXCHANGE, Config.QUEUE_API, mapper.writeValueAsString(ar));
    }

    @Operation(summary = "Get the result news from particular country",
            description = "Search can be made by writing country name")
    @Parameter(name = "country", description = "The country of the news", required = true)
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

    @Operation(summary = "Get the result news from particular topic",
            description = "Search can be made by writing topic name")
    @Parameter(name = "topic", description = "The topic of the news", required = true)
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

    @Operation(summary = "Get countries of news",
            description = "Returns the list of distinct countries for which news exist")
    @GetMapping("/api/countries")
    public String getCountries() throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        ApiRequest ar = new ApiRequest("GET_DISTINCT_COUNTRIES", null);
        return (String) rabbit.convertSendAndReceive(Config.EXCHANGE, Config.QUEUE_API, mapper.writeValueAsString(ar));
    }

    @Operation(summary = "Get topics of news",
            description = "Returns the list of distinct topics for which news exist")
    @GetMapping("/api/topics")
    public String getTopics() throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        ApiRequest ar = new ApiRequest("GET_DISTINCT_TOPICS", null);
        return (String) rabbit.convertSendAndReceive(Config.EXCHANGE, Config.QUEUE_API, mapper.writeValueAsString(ar));
    }

    @Operation(summary = "Get all news",
            description = "Returns the list of all news which exist in the database")
    @GetMapping("/api/news")
    public String getAllNews() throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        ApiRequest ar = new ApiRequest("GET_ALL_NEWS", null);
        return (String) rabbit.convertSendAndReceive(Config.EXCHANGE, Config.QUEUE_API, mapper.writeValueAsString(ar));
    }

}
