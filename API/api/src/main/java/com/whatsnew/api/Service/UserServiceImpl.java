package com.whatsnew.api.Service;

import com.whatsnew.api.mysql.User;
import com.whatsnew.api.mysql.UserRepository;
import jpaoletti.jpm.security.core.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl  implements UserService{
    private UserRepository userRepository;
    @Autowired
    public UserServiceImpl(UserRepository userRepository){
        this.userRepository=userRepository;
    }
    @Override
    public void saveUser(User user) {
        userRepository.save(user);
    }
    @Override
    public User getUserByNameAndPassword(String name, String password) throws UserNotFoundException {
        User user = userRepository.findByNameAndPassword(name, password);
        if(user == null){
            throw new UserNotFoundException();
        }
        return user;
    }
}
