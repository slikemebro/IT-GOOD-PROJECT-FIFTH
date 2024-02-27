package com.example.itfinalproject.service.impl;

import com.example.itfinalproject.domain.LessonsBalance;
import com.example.itfinalproject.domain.Payment;
import com.example.itfinalproject.domain.Salary;
import com.example.itfinalproject.domain.Student;
import com.example.itfinalproject.domain.Teacher;
import com.example.itfinalproject.dto.PaymentDto;
import com.example.itfinalproject.dto.SalaryDto;
import com.example.itfinalproject.exception.SalaryNotFoundException;
import com.example.itfinalproject.exception.StudentNotFoundException;
import com.example.itfinalproject.repository.LessonsBalanceRepository;
import com.example.itfinalproject.repository.PaymentRepository;
import com.example.itfinalproject.repository.StudentRepository;
import com.example.itfinalproject.repository.TeacherRepository;
import com.example.itfinalproject.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository repository;
    private final LessonsBalanceRepository balanceRepository;
    private final StudentRepository studentRepository;

    @Override
    public List<PaymentDto> findAll() {
        List<Payment> paymentList = repository.findAll();
        return getPaymentDtos(paymentList);
    }

    @Override
    public List<PaymentDto> findByStudent(Long studentId) {
        List<Payment> paymentList = repository.findByStudentId(studentId);
        return getPaymentDtos(paymentList);
    }

    @Override
    public PaymentDto save(PaymentDto paymentDto) {
        Long studentId = paymentDto.getStudentId();
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new StudentNotFoundException("Student not found"));

        Optional<LessonsBalance> balanceOptional = balanceRepository.findByStudentId(studentId);

        LessonsBalance balance;
        if (balanceOptional.isPresent()) {
            balance = balanceOptional.get();
            balance.setLessonsBalance(balance.getLessonsBalance() + paymentDto.getLessonsAmount());
        } else {
            balance = new LessonsBalance();
            balance.setLessonsBalance(paymentDto.getLessonsAmount());
            balance.setStudentId(paymentDto.getStudentId());
        }
        balanceRepository.save(balance);

        Payment payment = new Payment();
        payment.setAmount(paymentDto.getAmount());
        payment.setLessonsAmount(paymentDto.getLessonsAmount());
        payment.setPaymentDateTime(Instant.parse(paymentDto.getPaymentDateTime()));
        payment.setStudent(student);


        return getPaymentDto(repository.save(payment));
    }

    private List<PaymentDto> getPaymentDtos(List<Payment> paymentList) {
        List<PaymentDto> paymentDtoList = new ArrayList<>();
        for (Payment payment : paymentList) {
            paymentDtoList.add(getPaymentDto(payment));
        }
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
        return paymentDto;
    }
}
