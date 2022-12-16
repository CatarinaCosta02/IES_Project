package com.whatsnew.app.MQ;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
@EnableScheduling
public class Producer {

    @Autowired
    RabbitTemplate rabbitMQ;

    @Scheduled(fixedRate=30000)
    public void requestHN(){
        rabbitMQ.convertAndSend("data_gen", "requests",
                "{\"type\": \"hn\",\"method\": \"top_stories\"}");
    }

    @Scheduled(fixedRate=30000)
    public void requestReddit(){
        rabbitMQ.convertAndSend("data_gen", "requests",
                "{\"type\": \"reddit\",\"method\": \"top_stories\"}");
    }

    @Scheduled(fixedRate=30000)
    public void requestNYT(){
        rabbitMQ.convertAndSend("data_gen", "requests",
                "{\"type\": \"nyt\",\"method\": \"top_stories\"}");
    }
}
