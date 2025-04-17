package com.backend.TagAlong.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.backend.TagAlong.model.Role;
import com.backend.TagAlong.model.User;
import com.backend.TagAlong.repository.UserRepository;
import com.backend.TagAlong.security.JwtUtil;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User registerUser(String username, String email, String password) {
        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password)); // Encrypt password
        user.setRole(Role.USER); // Default role
        return userRepository.save(user);
    }

    public String generateToken(User user) {
        String email = user.getEmail();
        return jwtUtil.generateToken(email);
    }

    @Autowired
    private JwtUtil jwtUtil;

    public String loginUser(String email, String password) {
        Optional<User> user = userRepository.findByEmail(email);

        if (user.isPresent() && passwordEncoder.matches(password, user.get().getPassword())) {
            return jwtUtil.generateToken(email); // Generate JWT if login is successful
        }
        throw new RuntimeException("Invalid credentials");
    }
}
