package com.example.itfinalproject.controller;

import com.example.itfinalproject.domain.Teacher;
import com.example.itfinalproject.service.BaseEmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

import static org.springframework.http.HttpStatus.OK;

@RequiredArgsConstructor
@Controller
@RequestMapping("/api/v1/teacher")
public class TeacherController {

    private final BaseEmployeeService<Teacher> service;

    @GetMapping
    public ResponseEntity<List<Teacher>> findAll() {
        return new ResponseEntity<>(service.findAll(), OK);
    }

    @GetMapping("/active")
    public ResponseEntity<List<Teacher>> findActive() {
        return new ResponseEntity<>(service.findActive(), OK);
    }

    @GetMapping("/non-active")
    public ResponseEntity<List<Teacher>> findNonActive() {
        return new ResponseEntity<>(service.findDisabled(), OK);
    }

    @PostMapping
    public ResponseEntity<Teacher> saveOrUpdate(@RequestBody Teacher teacher) {
        return new ResponseEntity<>(service.updateOrSave(teacher), OK);
    }

    @GetMapping("/surname")
    public ResponseEntity<List<Teacher>> findBySurname(@RequestParam String surname) {
        return new ResponseEntity<>(service.findBySurname(surname), OK);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN') or @teacherServiceImpl.isCurrentUserIsTeacher(#id)")
    public ResponseEntity<Teacher> findById(@PathVariable("id") Long id) {
        return new ResponseEntity<>(service.findById(id), OK);
    }
}