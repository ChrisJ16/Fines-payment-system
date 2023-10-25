package com.example.assigone.service.impl;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Component
public class MyWebSocketHandler extends TextWebSocketHandler {
    // List to store WebSocket sessions of connected users
    private List<WebSocketSession> sessions = new ArrayList<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        // Add the session to the sessions list
        sessions.add(session);
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws IOException {
        // Get the message content
        String messageContent = message.getPayload();
        System.out.println(messageContent);

        if(sessions.isEmpty())
            System.out.println("yes");
        // Iterate over all connected sessions and send the message to each session
        for (WebSocketSession recipientSession : sessions) {
            if (recipientSession.isOpen()) {
                recipientSession.sendMessage(new TextMessage(messageContent));
            }
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        // Remove the session from the sessions list
        sessions.remove(session);
    }
}