package com.whatsnew.api.Service;

import com.whatsnew.api.mysql.User;
import com.whatsnew.api.mysql.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl {
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
        User user = userRepository.findByUserNameAndPassword(name, password);
        if(user == null){
            throw new UserNotFoundException("Invalid id and password");
        }
        return user;
    }
}
