package com.coderscampus.domain;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Message {
    @JsonProperty("channel")
    private String channel;

    @JsonProperty("text")
    private String text;

    @JsonProperty("fromUser")
    private String fromUser;

    @JsonProperty("toUser") 
    private String toUser;
    
    @JsonProperty("timestamp")
    private LocalDateTime timestamp;

    public Message() {}

    public Message(String channel, String text, String fromUser, String toUser) {
        this.channel = channel;
        this.text = text;
        this.fromUser = fromUser;
        this.toUser = toUser;
        this.timestamp = LocalDateTime.now();
    }

    public String getChannel() { return channel; }
    public String getText() { return text; }
    public String getFromUser() { return fromUser; }
    public String getToUser() { return toUser; }
    public LocalDateTime getTimestamp() { return timestamp; }

	@Override
	public String toString() {
		return "Message [channel=" + channel + ", text=" + text + ", fromUser=" + fromUser + ", toUser=" + toUser
				+ ", timestamp=" + timestamp + "]";
	}
}
