package com.coderscampus.Assignment14;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Message {
    @JsonProperty("channel")
    private String channel;

    @JsonProperty("text")
    private String text;

    @JsonProperty("fromUser") // Ensure JSON includes this field
    private String fromUser;

    public Message() {}

    public Message(String channel, String text, String fromUser) {
        this.channel = channel;
        this.text = text;
        this.fromUser = fromUser;
    }

    public String getChannel() {
        return channel;
    }

    public String getText() {
        return text;
    }

    public String getFromUser() {
        return fromUser;
    }

    @Override
    public String toString() {
        return "Message [channel=" + channel + ", text=" + text + ", fromUser=" + fromUser + "]";
    }
}
