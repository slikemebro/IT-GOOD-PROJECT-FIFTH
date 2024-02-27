package com.example.itfinalproject.controller;

import com.example.itfinalproject.domain.Payment;
import com.example.itfinalproject.dto.PaymentDto;
import com.example.itfinalproject.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

import static org.springframework.http.HttpStatus.OK;

@RequiredArgsConstructor
@Controller
@RequestMapping("/api/v1/payment")
public class PaymentController {

    private final PaymentService service;

    @GetMapping
    public ResponseEntity<List<PaymentDto>> findAll(){
        return new ResponseEntity<>(service.findAll(), OK);
    }

    @PostMapping
    public ResponseEntity<PaymentDto> save(@RequestBody PaymentDto paymentDto) {
        return new ResponseEntity<>(service.save(paymentDto), OK);
    }

}
