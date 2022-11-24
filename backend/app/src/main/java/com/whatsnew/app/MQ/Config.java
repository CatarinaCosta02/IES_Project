package com.whatsnew.app.MQ;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.amqp.core.*;

@Configuration
public class Config {

    public final static String QUEUE_HN = "hn";
    public final static String QUEUE_REDDIT = "reddit";
    public final static String EXCHANGE = "finished_data";
    public final static String ROUTING_KEY_HN = "hn";
    public final static String ROUTING_KEY_REDDIT = "reddit";


    // spring bean for rabbitmq queue
    @Bean
    public Queue queueHN() {
        return new Queue(QUEUE_HN, true);
    }

    @Bean
    public Queue queueReddit() {
        return new Queue(QUEUE_REDDIT, true);
    }

    // spring bean for rabbitmq exchange
    @Bean
    public DirectExchange exchange() {
        return new DirectExchange(EXCHANGE);
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
    public Consumer receiver() {
        return new Consumer();
    }
}

