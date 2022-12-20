package com.whatsnew.app.models;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Document(indexName = "news")
public class EKNews {
    @Id
    private String id;

    @Field(type = FieldType.Text)
    private String title;

    @Field(type = FieldType.Text)
    private String author;

    @Field(type = FieldType.Integer)
    private Integer score = null;

    @Field(type = FieldType.Text)
    private String permalink;

    @Field(type = FieldType.Integer)
    private Integer num_comments = null;

    @Field(type = FieldType.Integer)
    private int created;

    @Field(type = FieldType.Text)
    private String topic = null;

    @Field(type = FieldType.Text)
    private String country = null;

    @Field(type = FieldType.Text)
    private String summary = null;

    @Field(type = FieldType.Text)
    private String source = null;
}
