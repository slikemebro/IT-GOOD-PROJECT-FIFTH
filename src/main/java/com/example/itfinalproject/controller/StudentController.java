package com.example.itfinalproject.controller;

import com.example.itfinalproject.domain.Student;
import com.example.itfinalproject.dto.StudentDTO;
import com.example.itfinalproject.service.BaseEmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.OK;

@RequiredArgsConstructor
@Controller
@RequestMapping("/api/v1/student")
public class StudentController {

    private final BaseEmployeeService<Student> service;

    @GetMapping
    public ResponseEntity<List<StudentDTO>> findAll() {
        return new ResponseEntity<>(service.findAllWithLessonsBalance(), OK);
    }

    @GetMapping("/active")
    public ResponseEntity<List<Student>> findActive() {
        return new ResponseEntity<>(service.findActive(), OK);
    }

    @GetMapping("/non-active")
    public ResponseEntity<List<Student>> findNonActive() {
        return new ResponseEntity<>(service.findDisabled(), OK);
    }

    @PostMapping()
    public ResponseEntity<Student> saveOrUpdate(@RequestBody Student student) {
        return new ResponseEntity<>(service.updateOrSave(student), OK);
    }

    @GetMapping("/surname")
    public ResponseEntity<List<Student>> findBySurname(@RequestParam String surname) {
        return new ResponseEntity<>(service.findBySurname(surname), OK);
    }

    @GetMapping("/id")
    @PreAuthorize("hasAuthority('ADMIN') or @studentServiceImpl.isCurrentUserIsTeacherOfStudent(#id)")
    public ResponseEntity<Student> findById(@RequestParam Long id) {
        return new ResponseEntity<>(service.findById(id), OK);
    }

}
