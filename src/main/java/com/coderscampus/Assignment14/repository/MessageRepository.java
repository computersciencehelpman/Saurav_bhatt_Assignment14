package com.coderscampus.Assignment14.repository;

import java.io.*;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Repository;

@Repository
public class MessageRepository {
    
    private static final String FILE_PREFIX = "A14messages_"; // Prefix for channel files
    private static final String FILE_EXTENSION = ".txt"; // File extension

    private String getFileName(String channel) {
        return FILE_PREFIX + channel.replaceAll("\\s+", "_").toLowerCase() + FILE_EXTENSION;
    }

    public void saveMessage(String channel, String message) {
        String fileName = getFileName(channel);
        System.out.println("Saving message to file: " + fileName); // Debugging line

        try (FileWriter fw = new FileWriter(fileName, true);
             BufferedWriter bw = new BufferedWriter(fw)) {
            bw.write(message);
            bw.newLine();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public List<String> getAllMessages(String channel) {
        return loadMessagesFromFile(channel);
    }

    private List<String> loadMessagesFromFile(String channel) {
        List<String> messages = new ArrayList<>();
        String fileName = getFileName(channel);
        File file = new File(fileName);
        
        if (file.exists()) {
            System.out.println("Loading messages from " + fileName); // Debugging
            try (BufferedReader br = new BufferedReader(new FileReader(file))) {
                String line;
                while ((line = br.readLine()) != null) {
                    messages.add(line);
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        } else {
            System.out.println("No messages yet for channel: " + channel); // Debugging
        }
        return messages;
    }
}
