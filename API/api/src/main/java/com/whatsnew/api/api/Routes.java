package com.whatsnew.api.api;

import com.whatsnew.api.MQ.Config;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Routes {
    @Autowired
    RabbitTemplate rabbit;

    @Autowired
    Config config;

    @GetMapping("/hello")
    public String HelloRabbit() {
        rabbit.convertAndSend("api", "api", "Hello");
        return "Hello";
    }
}
