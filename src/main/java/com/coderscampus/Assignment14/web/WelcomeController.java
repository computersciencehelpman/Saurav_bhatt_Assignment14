package com.coderscampus.Assignment14.web;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Controller
public class WelcomeController {
		
    @GetMapping("/general")
    public String getGeneral(ModelMap model) {
        return "general"; 
    }
    
    @GetMapping("/channel1")
    public String getChannel1(ModelMap model) {
    	return "channel1";
    }
    
    @GetMapping("/channel2")
    public String getChannel2(ModelMap model) {
    	return "channel2";
    }
    
    @GetMapping("/channel3")
    public String getChannel3(ModelMap model) {
    	return "channel3";
    }
}
