package com.example.itfinalproject.repository;

import com.example.itfinalproject.domain.FirstLogin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FirstLoginRepository extends JpaRepository<FirstLogin, Long> {
    FirstLogin findByUserId(Long userId);

    void deleteByUserId(Long userId);

    boolean existsByUserId(Long userId);
}
