package com.coderscampus.Assignment14.web;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Controller
public class WelcomeController {

    @GetMapping("/welcome")
    public String welcomePage() {
        return "welcome"; 
    }
}

    
