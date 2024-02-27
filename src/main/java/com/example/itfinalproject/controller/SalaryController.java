package com.example.itfinalproject.controller;

import com.example.itfinalproject.domain.Salary;
import com.example.itfinalproject.dto.SalaryDto;
import com.example.itfinalproject.service.SalaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.OK;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/v1/salary")
public class SalaryController {

    private final SalaryService service;

    @GetMapping
    public ResponseEntity<List<SalaryDto>> findAll() {
        return new ResponseEntity<>(service.findAll(), OK);
    }

    @GetMapping("/teacher")
    @PreAuthorize("hasAuthority('ADMIN') or @salaryServiceImpl.isCurrentUserIsOwnerOfSalary(#id)")
    public ResponseEntity<List<SalaryDto>> findByTeacher(@RequestParam Long id){
        return new ResponseEntity<>(service.findByTeacherId(id), OK);
    }

    @PostMapping
    public ResponseEntity<SalaryDto> save(@RequestBody SalaryDto salaryDto) {
        return new ResponseEntity<>(service.save(salaryDto), OK);
    }

}
