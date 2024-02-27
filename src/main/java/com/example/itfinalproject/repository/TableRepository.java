package com.example.itfinalproject.repository;

import com.example.itfinalproject.domain.Table;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TableRepository extends JpaRepository<Table, Long> {

    List<Table> findByStudentId(Long studentId);

    List<Table> findByTeacherId(Long studentId);

}