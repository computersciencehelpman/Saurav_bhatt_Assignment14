package com.coderscampus.Assignment14;
import com.fasterxml.jackson.annotation.JsonProperty;

public class Message {
    @JsonProperty("channel")
    private String channel;

    @JsonProperty("text")
    private String text;

    public Message() {}

    public Message(String channel, String text) {
        this.channel = channel;
        this.text = text;
    }

    public String getChannel() {
        return channel;
    }

    public String getText() {
        return text;
    }

	@Override
	public String toString() {
		return "Message [channel=" + channel + ", text=" + text + "]";
	}
    
}
