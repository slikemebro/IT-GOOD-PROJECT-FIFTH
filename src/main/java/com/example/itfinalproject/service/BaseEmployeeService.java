package com.example.itfinalproject.service;

import com.example.itfinalproject.dto.StudentDTO;

import java.util.List;

public interface BaseEmployeeService<T> {

    List<T> findAll();

    List<StudentDTO> findAllWithLessonsBalance();

    T updateOrSave(T entity);

    List<T> findActive();

    List<T> findDisabled();

    T findById(Long id);

    List<T> findBySurname(String surname);
}
