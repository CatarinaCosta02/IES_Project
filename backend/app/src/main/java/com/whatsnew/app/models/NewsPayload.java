package com.whatsnew.app.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class NewsPayload {

    private String title;
    private String author;
    private int score;
    private String permalink;
    private Integer comments = null;
    private int created;
}
