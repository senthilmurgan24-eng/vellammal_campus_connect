package com.vellammal.campusconnect.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Value("${app.websocket.allowed-origins:http://localhost:5173,https://ranknovainstitute.com,https://www.ranknovainstitute.com}")
    private String allowedOrigins;

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/topic");
        config.setApplicationDestinationPrefixes("/app");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        List<String> origins = parseCsv(allowedOrigins);
        registry.addEndpoint("/ws-connect")
            .setAllowedOriginPatterns(origins.toArray(new String[0]))
                .withSockJS();
        registry.addEndpoint("/ws-connect")
            .setAllowedOriginPatterns(origins.toArray(new String[0]));
        }

        private List<String> parseCsv(String values) {
        return Arrays.stream(values.split(","))
            .map(String::trim)
            .filter(v -> !v.isEmpty())
            .collect(Collectors.toList());
    }
}
