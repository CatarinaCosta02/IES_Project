package com.whatsnew.app.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class NewsMQ {

    private String kind;
    private List<NewsPayload> payload;
    private Boolean success;

}
