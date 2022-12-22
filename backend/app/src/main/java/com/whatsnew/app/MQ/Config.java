package com.whatsnew.app.MQ;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.json.jackson.JacksonJsonpMapper;
import co.elastic.clients.transport.ElasticsearchTransport;
import co.elastic.clients.transport.rest_client.RestClientTransport;
import org.apache.http.HttpHost;
import org.elasticsearch.client.RestClient;
import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class Config {

    // queues names
    public final static String QUEUE_HN = "hn";
    public final static String QUEUE_REDDIT = "reddit";
    public final static String QUEUE_NYT = "nyt";
    public final static String QUEUE_REQUEST = "requests";
    public static final String QUEUE_API = "api";

    // exchanges names
    public final static String EXCHANGE = "finished_data";
    public final static String EXCHANGE_REQUEST = "data_gen";
    public final static String EXCHANGE_API = "api";

    // routing keys names
    public final static String ROUTING_KEY_HN = "hn";
    public final static String ROUTING_KEY_REDDIT = "reddit";
    public final static String ROUTING_KEY_NYT = "nyt";
    public final static String ROUTING_KEY_REQUEST = "requests";
    public final static String ROUTING_KEY_API = "api";

    @Value("${whatsnew.elasticsearch.uris}")
    private String elasticUri;



    // spring beans for rabbitmq queue
    @Bean
    public Queue queueHN() {
        return new Queue(QUEUE_HN, true);
    }

    @Bean
    public Queue queueReddit() {
        return new Queue(QUEUE_REDDIT, true);
    }

    @Bean
    public Queue queueNYT() {
        return new Queue(QUEUE_NYT, true);
    }

    @Bean
    public Queue queueRequest() {
        return new Queue(QUEUE_REQUEST, true);
    }

    @Bean
    public Queue queueAPI() {
        return new Queue(QUEUE_API, true);
    }

    // spring beans for rabbitmq exchange
    @Bean
    public DirectExchange exchange() {
        return new DirectExchange(EXCHANGE, false, false);
    }

    @Bean
    public DirectExchange exchangeRequest() {
        return new DirectExchange(EXCHANGE_REQUEST, false, false);
    }

    @Bean
    public DirectExchange exchangeAPI() {
        return new DirectExchange(EXCHANGE_API, false, false);
    }

    // binding between queue and exchange using routing key
    @Bean
    public Binding bindingHN() {
        return BindingBuilder.bind(queueHN()).to(exchange()).with(ROUTING_KEY_HN);
    }

    @Bean
    public Binding bindingReddit() {
        return BindingBuilder.bind(queueReddit()).to(exchange()).with(ROUTING_KEY_REDDIT);
    }

    @Bean
    public Binding bindingNYT() {
        return BindingBuilder.bind(queueNYT()).to(exchange()).with(ROUTING_KEY_NYT);
    }

    @Bean
    public Binding bindingRequest() {
        return BindingBuilder.bind(queueRequest()).to(exchangeRequest()).with(ROUTING_KEY_REQUEST);
    }

    @Bean
    public Binding bindingAPI() {
        return BindingBuilder.bind(queueAPI()).to(exchangeAPI()).with(ROUTING_KEY_API);
    }

    @Bean
    public Consumer receiver() {
        return new Consumer();
    }

    // ELASTICSEARCH CONFIGURATION
    @Bean
    public ElasticsearchClient elasticsearchConfig() {
        RestClient restClient = RestClient.builder(
                new HttpHost(elasticUri)).build();
        ElasticsearchTransport transport = new RestClientTransport(
                restClient, new JacksonJsonpMapper());
        return new ElasticsearchClient(transport);
    }
}

