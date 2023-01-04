package com.whatsnew.api.Service;

import com.whatsnew.api.mysql.User;
import jpaoletti.jpm.security.core.UserNotFoundException;
import org.springframework.stereotype.Service;


@Service
public interface UserService {
    public void saveUser(User user);
    public abstract User getUserByNameAndPassword(String name, String password) throws UserNotFoundException, UserNotFoundException;
}
