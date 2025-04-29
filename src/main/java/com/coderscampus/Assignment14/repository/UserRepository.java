package com.coderscampus.Assignment14.repository;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.coderscampus.domain.User;

@Repository
public class UserRepository {

    private final Map<String, User> users = new HashMap<>();

    public void addUser(String username) {
        users.put(username, new User(username));
    }

    public User getUser(String username) {
        return users.get(username);
    }

    public boolean userExists(String username) {
        return users.containsKey(username);
    }

    public Collection<User> getAllUsers() {
        return users.values();
    }
}
