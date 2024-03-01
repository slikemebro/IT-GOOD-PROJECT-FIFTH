package com.example.itfinalproject.service;

import com.example.itfinalproject.dto.PaymentDto;

import java.util.List;

public interface PaymentService {

    List<PaymentDto> findAll();

    List<PaymentDto> findByStudent(Long studentId);

    PaymentDto save(PaymentDto paymentDto);

}
