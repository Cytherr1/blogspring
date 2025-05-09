package com.blogspring.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blogspring.model.Credentials;
import com.blogspring.repository.CredentialsRepository;

@RestController
@CrossOrigin
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private CredentialsRepository credentialsRepository;

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(
        @RequestBody Map<String, String> body) {

        String username = body.get("username");
        String password = body.get("password");

        // Find user by username
        Credentials user = credentialsRepository.findByUsername(username);

        if (user != null && user.getPassword().equals(password)) {
            // Return the username if login is successful
            return ResponseEntity.ok(Map.of("username", username));
        }

        // If login fails, return a 401 Unauthorized response
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}
