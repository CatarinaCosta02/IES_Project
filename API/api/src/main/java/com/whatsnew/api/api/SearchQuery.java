package com.whatsnew.api.api;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SearchQuery {
    private String title;
    private String topic = null;
    private String country = null;
}
