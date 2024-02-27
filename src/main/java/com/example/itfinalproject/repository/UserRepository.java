package com.example.itfinalproject.repository;

import com.example.itfinalproject.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    Optional<User> findByTeacherId(Long teacherId);
}
