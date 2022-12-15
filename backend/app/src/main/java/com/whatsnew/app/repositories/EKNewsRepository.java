package com.whatsnew.app.repositories;

import com.whatsnew.app.models.EKNews;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EKNewsRepository extends ElasticsearchRepository<EKNews, String> {
    List<EKNews> searchByTitle(String title);
}
