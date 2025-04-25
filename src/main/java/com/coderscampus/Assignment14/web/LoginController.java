package com.coderscampus.Assignment14.web;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.coderscampus.Assignment14.repository.UserRepository;

import jakarta.servlet.http.HttpSession;

@Controller
public class LoginController {

    private final UserRepository userRepo;

    public LoginController(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    @PostMapping("/login")
    public String login(@RequestParam String username, HttpSession session) {
        if (!userRepo.userExists(username)) {
            userRepo.addUser(username);
        }

        session.setAttribute("username", username);
        return "redirect:/channels";
    }
    
    @PostMapping("/setSessionUser")
    @ResponseBody
    public void setSessionUser(@RequestBody Map<String, String> payload, HttpSession session) {
        String username = payload.get("username");
        if (username != null && !username.trim().isEmpty()) {
            username = username.trim();
            session.setAttribute("username", username);

            if (!userRepo.userExists(username)) {
                userRepo.addUser(username);
            }
        }

    }


}
