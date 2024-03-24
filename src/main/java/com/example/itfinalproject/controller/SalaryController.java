package com.example.itfinalproject.controller;

import com.example.itfinalproject.dto.SalaryDto;
import com.example.itfinalproject.service.SalaryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

import static org.springframework.http.HttpStatus.OK;

@Controller
@Log4j2
@RequiredArgsConstructor
@RequestMapping("/api/v1/salary")
public class SalaryController {

    private final SalaryService service;

    @GetMapping
    public ResponseEntity<List<SalaryDto>> findAll() {
        log.info("findAll salaries");
        return new ResponseEntity<>(service.findAll(), OK);
    }

    @GetMapping("/teacher")
    @PreAuthorize("hasAuthority('ADMIN') or @salaryServiceImpl.isUserOwnerOfSalary(#id)")
    public ResponseEntity<List<SalaryDto>> findByTeacher(@RequestParam Long id) {
        log.info("find salary by teacher id: {}", id);
        return new ResponseEntity<>(service.findByTeacherId(id), OK);
    }

    @PostMapping
    public ResponseEntity<SalaryDto> save(@RequestBody SalaryDto salaryDto) {
        log.info("save salary: {}", salaryDto);
        return new ResponseEntity<>(service.save(salaryDto), OK);
    }

}
