package com.whatsnew.api.JWT;

import com.whatsnew.api.mysql.User;
import java.util.Map;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import io.jsonwebtoken.Jwts;
import java.util.Date;
import java.util.HashMap;


@Service
public class JwtGeneratorImpl implements JwtGeneratorInterface{


        @Value("${jwt.secret}")
        private String secret;
        @Value("${app.jwttoken.message}")
        private String message;
        @Override
        public Map<String, String> generateToken(User user) {
            String jwtToken = "";
            jwtToken = Jwts.builder().setSubject(user.getName()).setIssuedAt(new Date()).signWith(SignatureAlgorithm.HS256, "secret").compact();
            Map<String, String> jwtTokenGen = new HashMap<>();
            jwtTokenGen.put("token", jwtToken);
            jwtTokenGen.put("message", message);
            return jwtTokenGen;
        }
}
