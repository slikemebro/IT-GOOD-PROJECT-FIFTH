package com.example.itfinalproject.service;

import com.example.itfinalproject.domain.Salary;
import com.example.itfinalproject.dto.SalaryDto;

import java.util.List;

public interface SalaryService {

    List<SalaryDto> findByTeacherId(Long teacherId);

    List<SalaryDto> findAll();

    SalaryDto save(SalaryDto salary);


}
