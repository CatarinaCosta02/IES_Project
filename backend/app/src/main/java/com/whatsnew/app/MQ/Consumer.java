package com.whatsnew.app.MQ;

import co.elastic.clients.elasticsearch.core.SearchResponse;
import co.elastic.clients.elasticsearch.core.search.Hit;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.whatsnew.app.models.ApiRequest;
import com.whatsnew.app.models.EKNews;
import com.whatsnew.app.models.NewsMQ;
import com.whatsnew.app.models.NewsPayload;
import co.elastic.clients.elasticsearch.ElasticsearchClient;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.mapping.IndexCoordinates;
import org.springframework.data.elasticsearch.core.query.IndexQuery;
import org.springframework.data.elasticsearch.core.query.IndexQueryBuilder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class Consumer {

    @Autowired
    private ElasticsearchOperations elasticsearchOperations;

    @Autowired
    private ElasticsearchClient client;

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
    public String consumeAPI(String message) throws IOException {
        System.out.println("Received message: " + message);
        ObjectMapper mapper = new ObjectMapper();
        ApiRequest apiRequest = mapper.readValue(message, ApiRequest.class);
        switch (apiRequest.getAction()) {
            case "SEARCH": {
                SearchResponse<EKNews> search = client.search(s -> s
                                .index("news")
                                .query(q -> q.bool(b -> {
                                    b.must(m -> m.match(ma -> ma.field("title").query(apiRequest.getPayload().getTitle())));

                                    if (apiRequest.getPayload().getCountry() != null) {
                                        b.must(m -> m.match(ma -> ma.field("country").query(apiRequest.getPayload().getCountry())));
                                    }

                                    if (apiRequest.getPayload().getTopic() != null) {
                                        b.must(m -> m.match(ma -> ma.field("topic").query(apiRequest.getPayload().getTopic())));
                                    }

                                    return b;
                                })),
                    EKNews.class);

                List<EKNews> hits = search.hits().hits().stream().map(Hit::source).toList();
                return mapper.writeValueAsString(hits);
            }
        }

        // return a message error
        return "{\"error\": \"Invalid action\"}";
    }

}
