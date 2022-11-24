package com.whatsnew.app.MQ;

import org.springframework.amqp.rabbit.annotation.RabbitListener;

public class Consumer {

    @RabbitListener(queues = {Config.QUEUE_HN, Config.QUEUE_REDDIT})
    public void consume(String message){
        System.out.println(message);
    }
}
