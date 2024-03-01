package com.example.itfinalproject.service.impl;

import com.example.itfinalproject.domain.LessonsBalance;
import com.example.itfinalproject.domain.Payment;
import com.example.itfinalproject.domain.Student;
import com.example.itfinalproject.dto.PaymentDto;
import com.example.itfinalproject.exception.StudentNotFoundException;
import com.example.itfinalproject.repository.LessonsBalanceRepository;
import com.example.itfinalproject.repository.PaymentRepository;
import com.example.itfinalproject.repository.StudentRepository;
import com.example.itfinalproject.service.PaymentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Log4j2
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository repository;
    private final LessonsBalanceRepository balanceRepository;
    private final StudentRepository studentRepository;

    @Override
    public List<PaymentDto> findAll() {
        List<Payment> paymentList = repository.findAll();
        log.info("Payments found: {}", paymentList.size());
        return getPaymentDtos(paymentList);
    }

    @Override
    public List<PaymentDto> findByStudent(Long studentId) {
        List<Payment> paymentList = repository.findByStudentId(studentId);
        log.info("Payments found by student: {}", paymentList.size());
        return getPaymentDtos(paymentList);
    }

    @Override
    public PaymentDto save(PaymentDto paymentDto) {
        Long studentId = paymentDto.getStudentId();
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new StudentNotFoundException("Student not found"));

        Optional<LessonsBalance> balanceOptional = balanceRepository.findByStudentId(studentId);

        LessonsBalance balance = getLessonsBalance(paymentDto, balanceOptional);
        balanceRepository.save(balance);
        log.info("Balance saved: {}", balance.getLessonsBalance());

        Payment payment = getPayment(paymentDto, student);
        log.info("Payment created: {}", payment.getAmount());

        return getPaymentDto(repository.save(payment));
    }

    private LessonsBalance getLessonsBalance(PaymentDto paymentDto, Optional<LessonsBalance> balanceOptional) {
        LessonsBalance balance;
        if (balanceOptional.isPresent()) {
            balance = balanceOptional.get();
            balance.setLessonsBalance(balance.getLessonsBalance() + paymentDto.getLessonsAmount());
            log.info("Balance updated: {}", balance.getLessonsBalance());
        } else {
            balance = new LessonsBalance();
            balance.setLessonsBalance(paymentDto.getLessonsAmount());
            balance.setStudentId(paymentDto.getStudentId());
            log.info("Balance created: {}", balance.getLessonsBalance());
        }
        return balance;
    }

    private Payment getPayment(PaymentDto paymentDto, Student student) {
        Payment payment = new Payment();
        payment.setAmount(paymentDto.getAmount());
        payment.setLessonsAmount(paymentDto.getLessonsAmount());
        payment.setPaymentDateTime(Instant.parse(paymentDto.getPaymentDateTime()));
        payment.setStudent(student);
        return payment;
    }

    private List<PaymentDto> getPaymentDtos(List<Payment> paymentList) {
        List<PaymentDto> paymentDtoList = new ArrayList<>();
        for (Payment payment : paymentList) {
            paymentDtoList.add(getPaymentDto(payment));
        }
        log.info("Payments converted to DTOs: {}", paymentDtoList.size());
        return paymentDtoList;
    }

    private PaymentDto getPaymentDto(Payment savePayment) {
        PaymentDto paymentDto = new PaymentDto();
        paymentDto.setAmount(savePayment.getAmount());
        paymentDto.setLessonsAmount(savePayment.getLessonsAmount());
        paymentDto.setPaymentDateTime(savePayment.getPaymentDateTime().toString());
        paymentDto.setStudentId(savePayment.getStudent().getId());
        paymentDto.setStudentName(savePayment.getStudent().getName());
        paymentDto.setStudentSurname(savePayment.getStudent().getSurname());

        log.info("Payment converted to DTO: {}", paymentDto.getAmount());
        return paymentDto;
    }
}
