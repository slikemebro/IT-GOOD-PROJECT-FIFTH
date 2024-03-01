package com.example.itfinalproject.service.impl;

import com.example.itfinalproject.domain.FirstLogin;
import com.example.itfinalproject.exception.FirstLoginNotFoundException;
import com.example.itfinalproject.repository.FirstLoginRepository;
import com.example.itfinalproject.service.FirstLoginService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Log4j2
@RequiredArgsConstructor
public class FirstLoginServiceImpl implements FirstLoginService {

    private final FirstLoginRepository repository;

    @Transactional
    @Override
    public FirstLogin save(FirstLogin firstLogin) {
        log.info("First login saved: " + firstLogin.getId());
        return repository.save(firstLogin);
    }

    @Override
    public FirstLogin findByUserId(Long userId) {
        log.info("First login found by user id: " + userId);
        return repository.findByUserId(userId);
    }

    @Transactional
    @Override
    public void deleteByUserId(Long userId) {
        if (repository.existsByUserId(userId)) {
            repository.deleteByUserId(userId);
            log.info("First login deleted by user id: " + userId);
        } else {
            throw new FirstLoginNotFoundException("First login not found");
        }
    }
}
