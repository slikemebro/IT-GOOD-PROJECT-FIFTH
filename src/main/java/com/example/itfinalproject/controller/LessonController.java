package com.example.itfinalproject.controller;

import com.example.itfinalproject.domain.Lesson;
import com.example.itfinalproject.service.LessonService;
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
@RequestMapping("/api/v1/lesson")
public class LessonController {

    private final LessonService service;

    @GetMapping
    public ResponseEntity<List<Lesson>> findAll() {
        log.info("findAll lessons");
        return new ResponseEntity<>(service.findAll(), OK);
    }

    @PostMapping("/ids")
    public ResponseEntity<List<Lesson>> findByIds(@RequestBody List<Long> ids) {
        log.info("findByIds lessons: {}", ids);
        return new ResponseEntity<>(service.findByIds(ids), OK);
    }

    @GetMapping("/teacher")
    @PreAuthorize("hasAuthority('ADMIN') or @lessonServiceImpl.isUserOwnerOfLesson(#teacherId)")
    public ResponseEntity<List<Lesson>> findByTeacherId(@RequestParam Long teacherId) {
        log.info("findByTeacherId lessons: {}", teacherId);
        return new ResponseEntity<>(service.findByTeacherId(teacherId), OK);
    }

    @PostMapping
    public ResponseEntity<Lesson> save(@RequestBody Lesson lesson, @RequestParam(required = false) Long tableId) {
        log.info("save lesson: {}", lesson);
        return new ResponseEntity<>(service.saveOrUpdate(lesson, tableId), OK);
    }

}
