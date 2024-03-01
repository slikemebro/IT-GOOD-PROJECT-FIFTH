package com.example.itfinalproject.service.impl;

import com.example.itfinalproject.domain.LessonsBalance;
import com.example.itfinalproject.repository.LessonsBalanceRepository;
import com.example.itfinalproject.service.LessonsBalanceService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Log4j2
@RequiredArgsConstructor
public class LessonsBalanceServiceImpl implements LessonsBalanceService {

    private final LessonsBalanceRepository repository;

    @Override
    public List<LessonsBalance> findAll() {
        log.info("Finding all lessons balance");
        return repository.findAll();
    }

    @Override
    public LessonsBalance findByStudent(Long studentId) {
        log.info("Finding lessons balance by student id: {}", studentId);
        return repository.findByStudentId(studentId).orElse(new LessonsBalance());
    }
}
