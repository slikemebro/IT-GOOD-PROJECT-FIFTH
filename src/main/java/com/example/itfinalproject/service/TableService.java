package com.example.itfinalproject.service;

import com.example.itfinalproject.domain.Table;
import com.example.itfinalproject.dto.TeacherStudentTableDTO;

import java.util.List;

public interface TableService {

    List<Table> findAll();

    List<Table> findByStudentId(Long studentId);

    List<Table> findByTeacherId(Long teacherId);

    List<TeacherStudentTableDTO> findNamesTable();

    Table findById(Long id);

    Table saveOrUpdate(Table table);
}
