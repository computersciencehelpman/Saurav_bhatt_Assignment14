package com.coderscampus.Assignment14.web;

import com.coderscampus.Assignment14.Message;
import com.coderscampus.Assignment14.service.MessageService;

import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

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
        System.out.println("Fetching messages for channel: " + channel);
        List<Message> messages = messageService.getMessages(channel);
        System.out.println("Messages returned: " + messages);
        return ResponseEntity.ok().body(messages);
    }

}
