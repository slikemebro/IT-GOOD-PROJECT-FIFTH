package com.example.itfinalproject.service.impl;

import com.example.itfinalproject.domain.FirstLogin;
import com.example.itfinalproject.exception.FirstLoginNotFoundException;
import com.example.itfinalproject.repository.FirstLoginRepository;
import com.example.itfinalproject.service.FirstLoginService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@RequiredArgsConstructor
public class FirstLoginServiceImpl implements FirstLoginService {

    private final FirstLoginRepository repository;

    @Override
    public FirstLogin save(FirstLogin firstLogin) {
        return repository.save(firstLogin);
    }

    @Override
    public FirstLogin findByUserId(Long userId) {
        return repository.findByUserId(userId);
    }

    @Transactional
    @Override
    public void deleteByUserId(Long userId) {
        if (repository.existsByUserId(userId)) {
            repository.deleteByUserId(userId);
        }else {
            throw new FirstLoginNotFoundException("First login not found");
        }
    }
}
