package com.whatsnew.app.MQ;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.whatsnew.app.models.ApiRequest;
import com.whatsnew.app.models.EKNews;
import com.whatsnew.app.models.NewsMQ;
import com.whatsnew.app.models.NewsPayload;
import com.whatsnew.app.repositories.EKNewsRepository;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.mapping.IndexCoordinates;
import org.springframework.data.elasticsearch.core.query.IndexQuery;
import org.springframework.data.elasticsearch.core.query.IndexQueryBuilder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class Consumer {

    @Autowired
    private ElasticsearchOperations elasticsearchOperations;

    @Autowired
    private EKNewsRepository ekNewsRepository;

    @Autowired
    RabbitTemplate rabbitMQ;

    @RabbitListener(queues = Config.QUEUE_HN)
    public void consumeHN(String message) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        NewsMQ news = mapper.readValue(message, NewsMQ.class);
        for (NewsPayload payload : news.getPayload()) {
            payload.setSource("HN");
            IndexQuery indexQuery = new IndexQueryBuilder()
                    .withIndex("news")
                    .withObject(payload)
                    .build();

            elasticsearchOperations.index(indexQuery, IndexCoordinates.of("news"));
        }
    }


    @RabbitListener(queues = Config.QUEUE_REDDIT)
    public void consumeReddit(String message) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        NewsMQ news = mapper.readValue(message, NewsMQ.class);
        for (NewsPayload payload : news.getPayload()) {
            payload.setSource("Reddit");
            IndexQuery indexQuery = new IndexQueryBuilder()
                    .withIndex("news")
                    .withObject(payload)
                    .build();

            elasticsearchOperations.index(indexQuery, IndexCoordinates.of("news"));
        }
    }


    @RabbitListener(queues = Config.QUEUE_API)
    public String consumeAPI(String message) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        ApiRequest apiRequest = mapper.readValue(message, ApiRequest.class);
        switch (apiRequest.getAction()) {
            case "SEARCH": {
                List<EKNews> results = ekNewsRepository.searchByTitle(apiRequest.getPayload().getQuery());
                return mapper.writeValueAsString(results);
            }
        }

        // return a message error
        return "{\"error\": \"Invalid action\"}";
    }

}
