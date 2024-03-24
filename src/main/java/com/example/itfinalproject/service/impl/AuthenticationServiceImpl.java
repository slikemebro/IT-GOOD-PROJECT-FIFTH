package com.example.itfinalproject.service.impl;

import com.example.itfinalproject.configuration.JwtUtils;
import com.example.itfinalproject.domain.User;
import com.example.itfinalproject.dto.AuthenticationRequest;
import com.example.itfinalproject.dto.AuthenticationResponse;
import com.example.itfinalproject.dto.RegisterRequest;
import com.example.itfinalproject.exception.TokenIsNotValidException;
import com.example.itfinalproject.exception.UserAlreadyExistException;
import com.example.itfinalproject.exception.UserNotFoundException;
import com.example.itfinalproject.repository.UserRepository;
import com.example.itfinalproject.service.AuthenticationService;
import com.example.itfinalproject.service.FirstLoginService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Log4j2
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    public static final String USER_WAS_NOT_FOUND_MESSAGE = "User wasn't found";
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final AuthenticationManager authenticationManager;
    private final FirstLoginService firstLoginService;

    @Override
    public AuthenticationResponse register(RegisterRequest request) {
        String encodedPassword = passwordEncoder.encode(request.getPassword());

        User user = User.builder()
                .email(request.getEmail())
                .username(request.getUsername())
                .password(encodedPassword)
                .role(request.getRole())
                .teacherId(request.getTeacherId())
                .build();
        repository.save(user);

        String jwtToken = jwtUtils.generateToken(user);
        log.info("User registered: {}", user.getEmail());
        return getAuthenticationResponse(jwtToken);
    }

    @Override
    @Transactional
    public User createUser(User user) {
        if (repository.findByEmail(user.getEmail()).isEmpty()) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            log.info("User created: {}", user.getEmail());
            return repository.save(user);
        }
        throw new UserAlreadyExistException("User with this email already exists");
    }

    @Override
    public AuthenticationResponse switchUser(Long teacherId) {
        User user = repository.findByTeacherId(teacherId)
                .orElseThrow(() -> new UserNotFoundException(USER_WAS_NOT_FOUND_MESSAGE));
        String jwtToken = jwtUtils.generateToken(user);
        log.info("User switched to: {}", user.getEmail());
        return getAuthenticationResponse(jwtToken);
    }

    @Override
    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        User user = repository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UserNotFoundException(USER_WAS_NOT_FOUND_MESSAGE));
        String jwtToken = jwtUtils.generateToken(user);
        log.info("User authenticated: {}", user.getEmail());
        return getAuthenticationResponse(jwtToken);
    }

    @Override
    public AuthenticationResponse verify(String token) {
        String username = jwtUtils.extractUsername(token);
        User user = repository.findByEmail(username)
                .orElseThrow(() -> new UserNotFoundException(USER_WAS_NOT_FOUND_MESSAGE));
        boolean isValid = jwtUtils.validateToken(token, user);
        if (isValid) {
            log.info("Token verified: {}", user.getEmail());
            return getAuthenticationResponse(token);
        } else {
            throw new TokenIsNotValidException("Token is not valid");
        }
    }

    private AuthenticationResponse getAuthenticationResponse(String token) {
        return AuthenticationResponse.builder()
                .token(token)
                .build();
    }

    public User getUserByTeacherId(Long teacherId) {
        log.info("User is finding by teacherId: {}", teacherId);
        return repository.findByTeacherId(teacherId)
                .orElseThrow(() -> new UserNotFoundException(USER_WAS_NOT_FOUND_MESSAGE));
    }

    public User getUserByEmail(String email) {
        log.info("User is finding by email: {}", email);
        return repository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException(USER_WAS_NOT_FOUND_MESSAGE));
    }

    @Transactional
    public User updateUserPassword(String email, String password) {
        User user = repository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException(USER_WAS_NOT_FOUND_MESSAGE));
        user.setPassword(passwordEncoder.encode(password));
        User updatedUser = repository.save(user);
        log.info("User password updated: {}", user.getEmail());
        firstLoginService.deleteByUserId(updatedUser.getId());
        log.info("FirstLogin deleted: {}", updatedUser.getEmail());
        return updatedUser;
    }
}
