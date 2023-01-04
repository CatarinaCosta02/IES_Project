package com.whatsnew.api.JWT;


import com.whatsnew.api.mysql.User;

import java.util.Map;
public interface JwtGeneratorInterface {
    Map<String, String> generateToken(User user);
}