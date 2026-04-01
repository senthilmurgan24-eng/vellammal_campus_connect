package com.vellammal.campusconnect.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;

@Service
public class GoogleSsoService {

    private final RestClient restClient;

    @Value("${app.auth.google.client-id:}")
    private String googleClientId;

    public GoogleSsoService(RestClient.Builder restClientBuilder) {
        this.restClient = restClientBuilder
                .baseUrl("https://oauth2.googleapis.com")
                .build();
    }

    public GoogleUser verifyIdToken(String idToken) {
        if (googleClientId == null || googleClientId.isBlank()) {
            throw new ResponseStatusException(HttpStatusCode.valueOf(500), "Google SSO is not configured");
        }

        Map<String, Object> claims;
        try {
            claims = restClient.get()
                    .uri(uriBuilder -> uriBuilder.path("/tokeninfo").queryParam("id_token", idToken).build())
                    .retrieve()
                    .body(Map.class);
        } catch (Exception ex) {
            throw new ResponseStatusException(HttpStatusCode.valueOf(401), "Invalid Google token");
        }

        if (claims == null) {
            throw new ResponseStatusException(HttpStatusCode.valueOf(401), "Unable to validate Google token");
        }

        String audience = asString(claims.get("aud"));
        if (!googleClientId.equals(audience)) {
            throw new ResponseStatusException(HttpStatusCode.valueOf(401), "Google token audience mismatch");
        }

        String emailVerified = asString(claims.get("email_verified"));
        if (!"true".equalsIgnoreCase(emailVerified)) {
            throw new ResponseStatusException(HttpStatusCode.valueOf(401), "Google email is not verified");
        }

        String email = asString(claims.get("email"));
        String name = asString(claims.get("name"));
        String subject = asString(claims.get("sub"));

        if (email == null || email.isBlank() || subject == null || subject.isBlank()) {
            throw new ResponseStatusException(HttpStatusCode.valueOf(401), "Google token missing user info");
        }

        return new GoogleUser(subject, email, (name == null || name.isBlank()) ? email : name);
    }

    private String asString(Object value) {
        return value == null ? null : String.valueOf(value);
    }

    public record GoogleUser(String subject, String email, String name) {
    }
}
