package com.whatsnew.app.MQ;

import co.elastic.clients.elasticsearch._types.aggregations.Aggregation;
import co.elastic.clients.elasticsearch._types.aggregations.MultiBucketBase;
import co.elastic.clients.elasticsearch._types.aggregations.StringTermsBucket;
import co.elastic.clients.elasticsearch._types.aggregations.TermsAggregation;
import co.elastic.clients.elasticsearch._types.query_dsl.MatchQuery;
import co.elastic.clients.elasticsearch._types.query_dsl.Query;
import co.elastic.clients.elasticsearch.core.SearchRequest;
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
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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
                                .size(10000)
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

            case "SEARCH_BY_COUNTRY": {
                SearchResponse<EKNews> search = client.search(s -> s
                                .index("news")
                                .size(10000)
                                .query(q -> q.bool(b -> {
                                    b.must(m -> m.match(ma -> ma.field("country").query(apiRequest.getPayload().getCountry())));
                                    return b;
                                })),
                        EKNews.class);

                List<EKNews> hits = search.hits().hits().stream().map(Hit::source).toList();
                return mapper.writeValueAsString(hits);
            }

            case "SEARCH_BY_TOPIC": {
                SearchResponse<EKNews> search = client.search(s -> s
                                .index("news")
                                .size(10000)
                                .query(q -> q.bool(b -> {
                                    b.must(m -> m.match(ma -> ma.field("topic").query(apiRequest.getPayload().getTopic())));
                                    return b;
                                })),
                        EKNews.class);

                List<EKNews> hits = search.hits().hits().stream().map(Hit::source).toList();
                return mapper.writeValueAsString(hits);
            }

            case "GET_DISTINCT_COUNTRIES": {
                Map<String, Aggregation> map = new HashMap<>();
                Aggregation aggregation = new Aggregation.Builder()
                        .terms(new TermsAggregation.Builder().field("country.keyword").size(10000).build())
                        .build();
                map.put("agg_country", aggregation);

                SearchRequest searchRequest = new SearchRequest.Builder()
                        .index("news")
                        .size(0)
                        .aggregations(map)
                        .build();

                SearchResponse<Void> response = client.search(searchRequest, Void.class);

                List<StringTermsBucket> buckets = response.aggregations()
                        .get("agg_country")
                        .sterms()
                        .buckets().array();

                List<String> countries = new ArrayList<>();
                for (StringTermsBucket bucket: buckets) {
                    countries.add(bucket.key().stringValue());
                }

                return mapper.writeValueAsString(countries);
            }


            case "GET_DISTINCT_TOPICS": {
                Map<String, Aggregation> map = new HashMap<>();
                Aggregation aggregation = new Aggregation.Builder()
                        .terms(new TermsAggregation.Builder().field("topic.keyword").size(10000).build())
                        .build();
                map.put("agg_topic", aggregation);

                SearchRequest searchRequest = new SearchRequest.Builder()
                        .index("news")
                        .size(0)
                        .aggregations(map)
                        .build();

                SearchResponse<Void> response = client.search(searchRequest, Void.class);

                List<StringTermsBucket> buckets = response.aggregations()
                        .get("agg_topic")
                        .sterms()
                        .buckets().array();

                List<String> topics = new ArrayList<>();
                for (StringTermsBucket bucket: buckets) {
                    topics.add(bucket.key().stringValue());
                }

                return mapper.writeValueAsString(topics);
            }


        }


        // return a message error
        return "{\"error\": \"Invalid action\"}";
    }

}
