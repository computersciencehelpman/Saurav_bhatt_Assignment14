package com.coderscampus.Assignment14.web;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class ChatController {

	@GetMapping("/{channel}")
	public String chatPage(@PathVariable("channel") String channel, Model model) {
	    if (channel == null || channel.isEmpty()) {
	        channel = "channel1"; // Default to channel1
	        System.out.println("❌ Error: Channel is missing! Using default: channel1");
	    } else {
	        System.out.println("✅ Channel received: " + channel);
	    }
	    model.addAttribute("channel", channel);
	    System.out.println("📡 Passing channel to view: " + channel);

	    // Return the correct Thymeleaf template dynamically
	    return channel; // e.g., "channel1", "channel2", etc.
	}
	
}
