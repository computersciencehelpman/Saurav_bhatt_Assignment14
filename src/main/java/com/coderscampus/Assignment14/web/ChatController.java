package com.coderscampus.Assignment14.web;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class ChatController {

	@GetMapping("/{channel}")
	public String chatPage(@PathVariable String channel, Model model) {
		if (channel == null || channel.isEmpty()) {
	        System.out.println("❌ Error: Channel is missing!");
	    } else {
	        System.out.println("✅ Channel received: " + channel);
	    }
	    model.addAttribute("channel", channel);
	    return "test"; // Ensure this matches your Thymeleaf template name
	}
	}

