package com.example.itfinalproject.service.impl;

import com.example.itfinalproject.domain.LessonsBalance;
import com.example.itfinalproject.repository.LessonsBalanceRepository;
import com.example.itfinalproject.service.LessonsBalanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LessonsBalanceServiceImpl implements LessonsBalanceService {

    private final LessonsBalanceRepository repository;

    @Override
    public List<LessonsBalance> findAll() {
        return repository.findAll();
    }

    @Override
    public LessonsBalance findByStudent(Long studentId) {
        return repository.findByStudentId(studentId).orElse(new LessonsBalance());
    }
}
