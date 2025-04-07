package com.coderscampus.Assignment14.web;

import com.coderscampus.Assignment14.Message;
import com.coderscampus.Assignment14.service.MessageService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/messages")
public class MessageController {
  
	@Autowired
    private MessageService messageService;

    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @PostMapping("/send/{channel}")
    public void sendMessage(@PathVariable String channel, @RequestBody Map<String, String> payload) {
        String text = payload.get("text");
        String fromUser = payload.get("fromUser");
        String toUser = payload.getOrDefault("toUser", ""); // Optional receiver

        if (fromUser == null || fromUser.isEmpty()) fromUser = "anonymous";

        messageService.addMessage(channel, text, fromUser, toUser);
    }
    
    @GetMapping("/all/{channel}")
    public ResponseEntity<List<Message>> getAllMessages(@PathVariable String channel) {
        channel = channel.toLowerCase();
        System.out.println("Fetching messages for channel: " + channel);
        
        List<Message> messages = messageService.getMessages(channel);
        if (messages == null) {
            System.out.println("No messages found for channel: " + channel);
            messages = new ArrayList<>(); // Return empty list instead of 404
        }

        return ResponseEntity.ok().body(messages);
    }

}