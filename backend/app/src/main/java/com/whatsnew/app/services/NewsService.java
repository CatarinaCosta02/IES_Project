package com.whatsnew.app.services;

import com.whatsnew.app.models.News;
import com.whatsnew.app.repositories.NewsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NewsService {

    @Autowired
    private NewsRepository repository;

    public News saveNews(News news){
        return repository.save(news);
    }

    public List<News> saveListNews(List<News> news){
        return (List<News>) repository.saveAll(news);
    }
}
