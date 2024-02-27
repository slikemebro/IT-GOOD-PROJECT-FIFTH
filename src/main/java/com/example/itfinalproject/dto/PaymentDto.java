package com.example.itfinalproject.dto;

import lombok.Data;

@Data
public class PaymentDto {
    private Double amount;
    private Integer lessonsAmount;
    private String paymentDateTime;
    private Long studentId;
    private String studentName;
    private String studentSurname;
}
