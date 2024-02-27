package com.example.itfinalproject.service;

import com.example.itfinalproject.domain.Lesson;

import java.util.List;

public interface LessonService {

    List<Lesson> findAll();

    List<Lesson> findByIds(List<Long> ids);

    Lesson saveOrUpdate(Lesson lesson, Long tableId);

    List<Lesson> findByTeacherId(Long teacherId);

}
