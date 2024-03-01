package com.example.itfinalproject.controller;

import com.example.itfinalproject.dto.PaymentDto;
import com.example.itfinalproject.service.PaymentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

import static org.springframework.http.HttpStatus.OK;

@Controller
@Log4j2
@RequiredArgsConstructor
@RequestMapping("/api/v1/payment")
public class PaymentController {

    private final PaymentService service;

    @GetMapping
    public ResponseEntity<List<PaymentDto>> findAll() {
        log.info("findAll payments");
        return new ResponseEntity<>(service.findAll(), OK);
    }

    @PostMapping
    public ResponseEntity<PaymentDto> save(@RequestBody PaymentDto paymentDto) {
        log.info("save payment: {}", paymentDto);
        return new ResponseEntity<>(service.save(paymentDto), OK);
    }

}
