package com.coderscampus.domain;

import java.time.LocalDateTime;

public class Message {
    private String content;
    private String fromUser;
    private String toUser;
    private LocalDateTime timestamp;

    public Message() {
        
    }

    public Message(String content, String fromUser, String toUser) {
        this.content = content;
        this.fromUser = fromUser;
        this.toUser = toUser;
        this.timestamp = LocalDateTime.now(); 
    }


    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getFromUser() {
        return fromUser;
    }

    public void setFromUser(String fromUser) {
        this.fromUser = fromUser;
    }

    public String getToUser() {
        return toUser;
    }

    public void setToUser(String toUser) {
        this.toUser = toUser;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}
