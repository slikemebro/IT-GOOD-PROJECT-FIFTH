package com.example.itfinalproject.dto;

import lombok.Data;

@Data
public class SalaryDto {
    private Double amount;
    private String dateTime;
    private Long teacherId;
    private String teacherName;
    private String teacherSurname;
}
