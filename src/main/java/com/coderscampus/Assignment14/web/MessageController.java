package com.coderscampus.Assignment14.web;

import com.coderscampus.Assignment14.Message;
import com.coderscampus.Assignment14.service.MessageService;

import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/messages")
public class MessageController {
    private final MessageService messageService;

    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @PostMapping("/send/{channel}")
    public void sendMessage(@PathVariable String channel, @RequestBody Map<String, String> payload) {
        System.out.println("Received message for channel: " + channel); // Debugging
        String text = payload.get("text");
        messageService.addMessage(channel, text);
    }
    
    @GetMapping("/all/{channel}")
    public ResponseEntity<List<Message>> getAllMessages(@PathVariable String channel) {
        channel = channel.toLowerCase(); // Normalize
        System.out.println("📡 API Request: Fetch messages for channel -> " + channel);

        List<Message> messages = messageService.getMessages(channel);
        
        if (messages == null || messages.isEmpty()) {
            System.out.println("❌ No messages found for channel: " + channel);
            return ResponseEntity.status(404).body(new ArrayList<>());
        }

        System.out.println("✅ Messages retrieved: " + messages.size());
        return ResponseEntity.ok().body(messages);
    }


}
