package com.coderscampus.domain;

import java.time.LocalDateTime;
import java.util.List;

public class Channel {
    private String name;
    private String lastMessage;
    private List<Message> messages;
    private LocalDateTime lastMessageTime; 
    
    public Channel() {
    	
    }

    public Channel(String name, String lastMessage) {
        this.name = name;
        this.lastMessage = lastMessage;
    }

    public String getName() {
    	return name; 
    }
    
    public void setName(String name) {
    	this.name = name; 
    }
    
    public List<Message> getMessages() { 
    	return messages; 
    }
    
    public void setMessages(List<Message> messages) {
    	this.messages = messages;
    }
    
    public String getLastMessage() {
    	return lastMessage;
    }
    
    public void setLastMessage(String lastMessage) { 
    	this.lastMessage = lastMessage;
    }
    
    public LocalDateTime getLastMessageTime() {
    	return lastMessageTime; 
    }
    
    public void setLastMessageTime(LocalDateTime lastMessageTime) {
    	this.lastMessageTime = lastMessageTime;
    }
    
}
