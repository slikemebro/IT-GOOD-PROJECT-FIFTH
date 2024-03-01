package com.example.itfinalproject.controller;

import com.example.itfinalproject.domain.User;
import com.example.itfinalproject.dto.AuthenticationRequest;
import com.example.itfinalproject.dto.AuthenticationResponse;
import com.example.itfinalproject.dto.RegisterRequest;
import com.example.itfinalproject.service.impl.AuthenticationServiceImpl;
import com.example.itfinalproject.util.AuthUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/auth")
@RequiredArgsConstructor
@Log4j2
public class AuthenticationController {

    private final AuthenticationServiceImpl service;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ) {
        log.info("Register request: {}", request);
        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request
    ) {
        log.info("Authenticate request: {}", request);
        return ResponseEntity.ok(service.authenticate(request));
    }

    @PostMapping("/verify-token")
    public ResponseEntity<AuthenticationResponse> verifyToken(
            @RequestParam String token
    ) {
        log.info("Verify token request");
        return ResponseEntity.ok(service.verify(token));
    }

    @GetMapping("/current-user")
    public ResponseEntity<UserDetails> getCurrentUser() {
        log.info("Get current user request");
        return ResponseEntity.ok(AuthUtil.getCurrentUser());
    }

    @GetMapping("/user")
    public ResponseEntity<User> getUserAfterCreatingTeacher(@RequestParam Long teacherId) {
        log.info("Get user after creating teacher. TeacherId: {}", teacherId);
        return ResponseEntity.ok(service.getUserByTeacherId(teacherId));
    }

    @GetMapping("/user/first-login")
    public ResponseEntity<User> getUserByEmail(@RequestParam String email) {
        log.info("Get user by email: {}", email);
        return ResponseEntity.ok(service.getUserByEmail(email));
    }

    @PutMapping("/user/password")
    public ResponseEntity<User> updateUserPassword(@RequestParam String password, @RequestParam String email) {
        log.info("Update user password: {}; email: {}", password, email);
        return ResponseEntity.ok(service.updateUserPassword(email, password));
    }

    @PostMapping("/user/switch")
    public ResponseEntity<AuthenticationResponse> switchUser(@RequestParam Long teacherId) {
        log.info("Switch user request: {}", teacherId);
        return ResponseEntity.ok(service.switchUser(teacherId));
    }

}
