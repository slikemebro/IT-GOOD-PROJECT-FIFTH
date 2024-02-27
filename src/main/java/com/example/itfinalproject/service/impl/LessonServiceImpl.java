package com.example.itfinalproject.service.impl;

import com.example.itfinalproject.domain.Lesson;
import com.example.itfinalproject.domain.LessonsBalance;
import com.example.itfinalproject.domain.Table;
import com.example.itfinalproject.domain.User;
import com.example.itfinalproject.repository.LessonRepository;
import com.example.itfinalproject.repository.LessonsBalanceRepository;
import com.example.itfinalproject.repository.TableRepository;
import com.example.itfinalproject.service.LessonService;
import com.example.itfinalproject.util.AuthUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@Log4j2
@RequiredArgsConstructor
public class LessonServiceImpl implements LessonService {

    private final LessonRepository repository;
    private final LessonsBalanceRepository balanceRepository;
    private final TableRepository tableRepository;
    private final SalaryServiceImpl salaryService;
    private final static Double LESSON_PRICE = 130.0;

    @Override
    public List<Lesson> findAll() {
        return repository.findAll();
    }

    @Override
    public List<Lesson> findByIds(List<Long> ids) {
        return repository.findByIdIn(ids);
    }

    @Override
    public List<Lesson> findByTeacherId(Long teacherId) {
        return repository.findByTeacherId(teacherId);
    }

    @Override
    public Lesson saveOrUpdate(Lesson lessonRequest, Long tableId) {
        boolean lessonIdNull = lessonRequest.getId() == null;

        if (lessonRequest.getStatus() == 2) {
            Optional<LessonsBalance> balanceOptional = balanceRepository.findByStudentId(lessonRequest.getStudentId());
            processBalance(balanceOptional, lessonRequest.getTeacherId());
        }

        Lesson lesson = repository.save(lessonRequest);

        if (lessonIdNull) {
            Table table = tableRepository.findById(tableId).get();

            List<Long> lessonsIds = table.getLessonIds();
            lessonsIds.add(lesson.getId());

            tableRepository.save(table);
        }

        return lesson;
    }

    private void processBalance(Optional<LessonsBalance> balanceOptional, long teacherId) {
        if (balanceOptional.isPresent()) {
            LessonsBalance balance = balanceOptional.get();
            balance.setLessonsBalance(balance.getLessonsBalance() - 1);
            balanceRepository.save(balance);

        }
    }


    public boolean isCurrentUserIsOwnerOfLesson(Long teacherId) {
        User user = (User) AuthUtil.getCurrentUser();

        return Objects.equals(user.getTeacherId(), teacherId);
    }
}
