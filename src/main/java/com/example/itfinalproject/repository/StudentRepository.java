package com.example.itfinalproject.repository;

import com.example.itfinalproject.domain.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

    List<Student> findByActiveTrue();

    List<Student> findByActiveFalse();

    List<Student> findBySurname(String surname);
}