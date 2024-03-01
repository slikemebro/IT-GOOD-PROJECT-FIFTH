package com.example.itfinalproject.controller;

import com.example.itfinalproject.domain.Student;
import com.example.itfinalproject.dto.StudentDTO;
import com.example.itfinalproject.service.BaseEmployeeService;
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
@RequestMapping("/api/v1/student")
public class StudentController {

    private final BaseEmployeeService<Student> service;

    @GetMapping
    public ResponseEntity<List<StudentDTO>> findAll() {
        log.info("findAll students");
        return new ResponseEntity<>(service.findAllWithLessonsBalance(), OK);
    }

    @GetMapping("/active")
    public ResponseEntity<List<Student>> findActive() {
        log.info("find active students");
        return new ResponseEntity<>(service.findActive(), OK);
    }

    @GetMapping("/non-active")
    public ResponseEntity<List<Student>> findNonActive() {
        log.info("find non-active students");
        return new ResponseEntity<>(service.findDisabled(), OK);
    }

    @PostMapping()
    public ResponseEntity<Student> saveOrUpdate(@RequestBody Student student) {
        log.info("save or update student");
        return new ResponseEntity<>(service.updateOrSave(student), OK);
    }

    @GetMapping("/surname")
    public ResponseEntity<List<Student>> findBySurname(@RequestParam String surname) {
        log.info("find students by surname: {}", surname);
        return new ResponseEntity<>(service.findBySurname(surname), OK);
    }

    @GetMapping("/id")
    @PreAuthorize("hasAuthority('ADMIN') or @studentServiceImpl.isCurrentUserIsTeacherOfStudent(#id)")
    public ResponseEntity<Student> findById(@RequestParam Long id) {
        log.info("find student by id: {}", id);
        return new ResponseEntity<>(service.findById(id), OK);
    }

}
