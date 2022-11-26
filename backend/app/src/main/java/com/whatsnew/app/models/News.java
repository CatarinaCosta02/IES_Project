package com.whatsnew.app.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

@Data
@Document(indexName = "news")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class News {

    @Id
    private String id;

    @Field(type = FieldType.Text, name = "title")
    private String title;

    @Field(type = FieldType.Text, name = "author")
    private String author;

    @Field(type = FieldType.Text, name = "source")
    private String source;

    @Field(type = FieldType.Integer, name = "score")
    private int score;

    @Field(type = FieldType.Text, name = "permalink")
    private String permalink;

    @Field(type = FieldType.Integer, name = "created")
    private int created;
}
