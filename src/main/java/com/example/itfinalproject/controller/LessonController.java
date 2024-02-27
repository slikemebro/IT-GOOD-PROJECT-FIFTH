package com.example.itfinalproject.controller;

import com.example.itfinalproject.domain.Lesson;
import com.example.itfinalproject.service.LessonService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.OK;

@RequiredArgsConstructor
@Controller
@RequestMapping("/api/v1/lesson")
public class LessonController {

    private final LessonService service;

    @GetMapping
    public ResponseEntity<List<Lesson>> findAll() {
        return new ResponseEntity<>(service.findAll(), OK);
    }

    @PostMapping("/ids")
    public ResponseEntity<List<Lesson>> findByIds(@RequestBody List<Long> ids){
        return new ResponseEntity<>(service.findByIds(ids), OK);
    }

    @GetMapping("/teacher")
    @PreAuthorize("hasAuthority('ADMIN') or @lessonServiceImpl.isCurrentUserIsOwnerOfLesson(#teacherId)")
    public ResponseEntity<List<Lesson>> findByTeacherId(@RequestParam Long teacherId) {
        return new ResponseEntity<>(service.findByTeacherId(teacherId), OK);
    }

    @PostMapping
    public ResponseEntity<Lesson> save(@RequestBody Lesson lesson, @RequestParam(required = false) Long tableId) {
        return new ResponseEntity<>(service.saveOrUpdate(lesson, tableId), OK);
    }

}
