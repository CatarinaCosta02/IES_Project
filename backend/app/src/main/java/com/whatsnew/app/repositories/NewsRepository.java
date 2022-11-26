package com.whatsnew.app.repositories;

import com.whatsnew.app.models.News;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NewsRepository extends ElasticsearchRepository<News, String> {

    List<News> findByTitle(String title);
    List<News> findByTitleContaining(String title);
}
