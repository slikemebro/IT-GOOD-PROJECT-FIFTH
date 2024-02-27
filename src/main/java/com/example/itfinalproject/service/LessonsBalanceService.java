package com.example.itfinalproject.service;

import com.example.itfinalproject.domain.LessonsBalance;

import java.util.List;

public interface LessonsBalanceService {

    List<LessonsBalance> findAll();

    LessonsBalance findByStudent(Long studentId);

}
