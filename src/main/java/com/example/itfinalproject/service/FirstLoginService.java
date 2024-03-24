package com.example.itfinalproject.service;

import com.example.itfinalproject.domain.FirstLogin;

public interface FirstLoginService {

    FirstLogin save(FirstLogin firstLogin);

    FirstLogin findByUserId(Long userId);

    void deleteByUserId(Long userId);

}
