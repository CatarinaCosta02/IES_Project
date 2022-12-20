package com.whatsnew.app.MQ;

import co.elastic.clients.elasticsearch.core.SearchRequest;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.whatsnew.app.models.*;
import com.whatsnew.app.repositories.EKNewsRepository;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.MultiMatchQueryBuilder;
import org.elasticsearch.index.query.QueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.elasticsearch.client.erhlc.NativeSearchQueryBuilder;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.elasticsearch.core.mapping.IndexCoordinates;
import org.springframework.data.elasticsearch.core.query.*;
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
        if (news.getSuccess()) {
            for (NewsPayload payload : news.getPayload()) {
                IndexQuery indexQuery = new IndexQueryBuilder()
                        .withIndex("news")
                        .withObject(payload)
                        .build();

                elasticsearchOperations.index(indexQuery, IndexCoordinates.of("news"));
            }
        }
    }


    @RabbitListener(queues = Config.QUEUE_NYT)
    public void consumeNYT(String message) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        NewsMQ news = mapper.readValue(message, NewsMQ.class);
        for (NewsPayload payload : news.getPayload()) {
            payload.setSource("NYT");
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
                ApiPayload apiPayload = apiRequest.getPayload();

                List<EKNews> news = ekNewsRepository.findByTitleAndTopicAndCountry(apiPayload.getTitle(), apiPayload.getTopic(), apiPayload.getCountry());
                return mapper.writeValueAsString(news);
            }
        }
        // return a message error
        return "{\"error\": \"Invalid action\"}";
    }
}
