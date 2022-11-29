package com.whatsnew.app.MQ;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.whatsnew.app.models.News;
import com.whatsnew.app.models.NewsMQ;
import com.whatsnew.app.models.NewsPayload;
import com.whatsnew.app.repositories.NewsRepository;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class Consumer {

    @Autowired
    private NewsRepository repository;

    @RabbitListener(queues = Config.QUEUE_HN)
    public void consumeHN(String message) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        NewsMQ news = mapper.readValue(message, NewsMQ.class);
        for (NewsPayload payload : news.getPayload()) {
            News n = new News();
            n.setTitle(payload.getTitle());
            n.setAuthor(payload.getAuthor());
            n.setScore(payload.getScore());
            n.setCreated(payload.getCreated());
            n.setPermalink(payload.getPermalink());
            n.setSource("hn");
            n.set_id("");

            repository.save(n);
        }
    }

}
