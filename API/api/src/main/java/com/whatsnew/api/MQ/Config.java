package com.whatsnew.api.MQ;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.amqp.core.*;

@Configuration
public class Config {

    public final static String QUEUE_API = "api";
    public final static String EXCHANGE = "api";

    @Bean
    public DirectExchange exchange() {
        return new DirectExchange(EXCHANGE, false, false);
    }

    // spring bean for rabbitmq queue
    @Bean
    public Queue queueApi() {
        return new Queue(QUEUE_API, true);
    }
}