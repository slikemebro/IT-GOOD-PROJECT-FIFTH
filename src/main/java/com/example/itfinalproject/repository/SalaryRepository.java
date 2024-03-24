package com.example.itfinalproject.repository;

import com.example.itfinalproject.domain.Salary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SalaryRepository extends JpaRepository<Salary, Long> {

    List<Salary> findByTeacherId(Long teacherId);

}
