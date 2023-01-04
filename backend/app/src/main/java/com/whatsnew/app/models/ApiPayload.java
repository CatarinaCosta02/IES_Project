package com.whatsnew.app.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ApiPayload {
    private String title;
    private String topic = null;
    private String country = null;
}
