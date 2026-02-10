package com.vellammal.campusconnect.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AuthDtos {

    @Data
    public static class LoginRequest {
        @NotBlank
        private String identifier;
        @NotBlank
        private String password;
        @NotBlank
        private String role;
    }

    @Data
    public static class TokenResponse {
        private String accessToken;
        private String refreshToken;
        private Object user;
    }

    @Data
    public static class RefreshRequest {
        @NotBlank
        private String refreshToken;
    }
}
