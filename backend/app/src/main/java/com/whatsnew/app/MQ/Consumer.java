package com.whatsnew.app.MQ;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.whatsnew.app.models.NewsMQ;
import com.whatsnew.app.models.NewsPayload;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.mapping.IndexCoordinates;
import org.springframework.data.elasticsearch.core.query.IndexQuery;
import org.springframework.data.elasticsearch.core.query.IndexQueryBuilder;
import org.springframework.stereotype.Service;

@Service
public class Consumer {

    @Autowired
    private ElasticsearchOperations elasticsearchOperations;

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

}
