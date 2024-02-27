package com.example.itfinalproject.service;

import com.example.itfinalproject.domain.User;
import com.example.itfinalproject.dto.AuthenticationRequest;
import com.example.itfinalproject.dto.AuthenticationResponse;
import com.example.itfinalproject.dto.RegisterRequest;

public interface AuthenticationService {
    AuthenticationResponse register(RegisterRequest request);

    AuthenticationResponse authenticate(AuthenticationRequest request);

    AuthenticationResponse verify(String token);

    User createUser(User user);

    AuthenticationResponse switchUser(Long teacherId);
}
