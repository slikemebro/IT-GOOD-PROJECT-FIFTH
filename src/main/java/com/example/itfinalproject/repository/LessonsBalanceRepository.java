package com.example.itfinalproject.repository;

import com.example.itfinalproject.domain.LessonsBalance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LessonsBalanceRepository extends JpaRepository<LessonsBalance, Long> {

    Optional<LessonsBalance> findByStudentId(Long studentId);

}