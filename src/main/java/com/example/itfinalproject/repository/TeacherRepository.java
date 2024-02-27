package com.example.itfinalproject.repository;

import com.example.itfinalproject.domain.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeacherRepository extends JpaRepository<Teacher, Long>, JpaSpecificationExecutor<Teacher> {

    List<Teacher> findByActiveTrue();

    List<Teacher> findByActiveFalse();

    List<Teacher> findBySurname(String surname);
}