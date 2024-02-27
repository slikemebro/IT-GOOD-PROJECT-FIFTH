package com.example.itfinalproject.service.impl;

import com.example.itfinalproject.configuration.JwtUtils;
import com.example.itfinalproject.domain.Teacher;
import com.example.itfinalproject.dto.AuthenticationResponse;
import com.example.itfinalproject.dto.RegisterRequest;
import com.example.itfinalproject.dto.AuthenticationRequest;
import com.example.itfinalproject.domain.User;
import com.example.itfinalproject.exception.TeacherNotFoundException;
import com.example.itfinalproject.exception.TokenIsNotValidException;
import com.example.itfinalproject.exception.UserNotFoundException;
import com.example.itfinalproject.repository.TeacherRepository;
import com.example.itfinalproject.repository.UserRepository;
import com.example.itfinalproject.service.AuthenticationService;
import com.example.itfinalproject.service.BaseEmployeeService;
import com.example.itfinalproject.service.FirstLoginService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

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
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    @Override
    @Transactional
    public User createUser(User user) {
        if (repository.findByEmail(user.getEmail()).isEmpty()) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            return repository.save(user);
        }
//            throw new UserAlreadyExistException("User with this email already exists");
        return null;
    }

    @Override
    public AuthenticationResponse switchUser(Long teacherId) {
        User user = repository.findByTeacherId(teacherId)
                .orElseThrow(() -> new UserNotFoundException("User wasn't found"));
        String jwtToken = jwtUtils.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
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
                .orElseThrow(() -> new UserNotFoundException("User wasn't found"));
        String jwtToken = jwtUtils.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    @Override
    public AuthenticationResponse verify(String token) {
        String username = jwtUtils.extractUsername(token);
        User user = repository.findByEmail(username)
                .orElseThrow(() -> new UserNotFoundException("User wasn't found"));
        boolean verified = jwtUtils.validateToken(token, user);
        if (verified) {
            return AuthenticationResponse.builder()
                    .token(token)
                    .build();
        }else {
            throw new TokenIsNotValidException("Token is not valid");
        }
    }

    public User getUserByTeacherId(Long teacherId) {
        return repository.findByTeacherId(teacherId)
                .orElseThrow(() -> new UserNotFoundException("User wasn't found"));
    }

    public User getUserByEmail(String email) {
        return repository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User wasn't found"));
    }

    @Transactional
    public User updateUserPassword(String email, String password) {
        User user = repository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User wasn't found"));
        user.setPassword(passwordEncoder.encode(password));
        User updatedUser = repository.save(user);

        firstLoginService.deleteByUserId(updatedUser.getId());
        return updatedUser;
    }
}
