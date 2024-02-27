package com.example.itfinalproject.repository;

import com.example.itfinalproject.domain.Salary;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SalaryRepository extends JpaRepository<Salary, Long> {

    List<Salary> findByTeacherId(Long teacherId);


}
