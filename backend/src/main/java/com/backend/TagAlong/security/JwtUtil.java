package com.backend.TagAlong.security;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;


@Component
public class JwtUtil {
    private static final String SECRET_KEY = "a24cb8f34c653118fb63f29b9c0dd2e3"; // HMAC hash string of 256 bits
    private static final long EXPIRATION_TIME = 86400000; // 1 day in milliseconds

    private final SecretKey key;

    public JwtUtil() {
        // Log the key length to help diagnose the issue
        System.out.println("SECRET_KEY length: " + SECRET_KEY.getBytes().length);

        if (SECRET_KEY.getBytes().length != 32) {
            throw new RuntimeException("The SECRET_KEY must be 256 bits (32 bytes). Current length: " + SECRET_KEY.getBytes().length);
        }

        try {
            // Create the key using the correct length
            this.key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
        } catch (Exception e) {
            throw new RuntimeException("Error generating the JWT Secret Key: " + e.getMessage(), e);
        }
    }

    public String generateToken(String email) {
        return Jwts.builder()
                .subject(email)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(key)
                .compact();
    }

    public String extractEmail(String token) {
        return Jwts.parser().verifyWith(key).build()
                .parseSignedClaims(token).getPayload().getSubject();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser().verifyWith(key).build().parseSignedClaims(token);
            return true;
        } catch (JwtException e) {
            return false;
        }
    }
}
