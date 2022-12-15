package com.whatsnew.app.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class NewsPayload {

    private String title;
    private String author;
    private int score;
    private String permalink;
    private Integer num_comments = null;
    private int created;
    private String source = null;
}
