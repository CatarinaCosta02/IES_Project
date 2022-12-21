package com.whatsnew.app.repositories;

import com.whatsnew.app.models.EKNews;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.data.repository.query.QueryByExampleExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EKNewsRepository extends ElasticsearchRepository<EKNews, String> {
    // Combined query to search for for title and topic and country or a combination of them
    @Query("{\"bool\": {\"must\": [{\"match\": {\"title\": \"?0\"}}, {\"match\": {\"topic\": \"?1\"}}, {\"match\": {\"country\": \"?2\"}}]}}")
    List<EKNews> findByTitleAndTopicAndCountry(String title, String topic, String country);
}
