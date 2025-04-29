package com.coderscampus.Assignment14.web;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.coderscampus.Assignment14.service.MessageService;
import com.coderscampus.domain.Message;

@RestController
@RequestMapping("/messages")
public class MessageController {

    private final MessageService messageService;

    @Autowired
    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @PostMapping("/send/{channel}")
    public ResponseEntity<Void> sendMessage(@PathVariable String channel, @RequestBody Map<String, String> payload) {
        String text = payload.get("text");
        String fromUser = payload.get("fromUser");
        String toUser = payload.getOrDefault("toUser", ""); // Optional receiver

        if (fromUser == null || fromUser.isEmpty()) {
            fromUser = "anonymous";
        }

        messageService.addMessage(channel, text, fromUser, toUser);
        return ResponseEntity.ok().build(); // ✅ Explicitly respond 200 OK
    }

    @GetMapping("/all/{channel}")
    public ResponseEntity<List<Message>> getAllMessages(@PathVariable String channel) {
        channel = channel.toLowerCase();
        System.out.println("Fetching messages for channel: " + channel);

        List<Message> messages = messageService.getMessages(channel);
        if (messages == null) {
            System.out.println("No messages found for channel: " + channel);
            messages = new ArrayList<>(); // Empty list if nothing
        }

        return ResponseEntity.ok().body(messages); // ✅ Properly return messages as JSON
    }
}
