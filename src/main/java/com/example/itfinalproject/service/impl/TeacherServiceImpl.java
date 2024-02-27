package com.example.itfinalproject.service.impl;

import com.example.itfinalproject.domain.FirstLogin;
import com.example.itfinalproject.domain.Role;
import com.example.itfinalproject.domain.Teacher;
import com.example.itfinalproject.domain.User;
import com.example.itfinalproject.dto.RegisterRequest;
import com.example.itfinalproject.dto.StudentDTO;
import com.example.itfinalproject.exception.TeacherNotFoundException;
import com.example.itfinalproject.repository.TeacherRepository;
import com.example.itfinalproject.service.BaseEmployeeService;
import com.example.itfinalproject.service.FirstLoginService;
import com.example.itfinalproject.util.AuthUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.List;
import java.util.Objects;

@Service
@Log4j2
@RequiredArgsConstructor
public class TeacherServiceImpl implements BaseEmployeeService<Teacher> {

    private final TeacherRepository repository;
    private final AuthenticationServiceImpl authenticationService;
    private final FirstLoginService firstLoginService;


    @Override
    public List<Teacher> findAll() {
        return repository.findAll();
    }

    @Override
    public List<StudentDTO> findAllWithLessonsBalance() {
        return null;
    }

    @Override
    @Transactional
    public Teacher updateOrSave(Teacher teacher) {
        boolean isExist = teacher.getId() != null;
        Teacher createdTeacher = repository.save(teacher);
        if (isExist) {
            log.info("Teacher updated: " + teacher.getId());
            return createdTeacher;
        }
        createUser(createdTeacher);

        return createdTeacher;
    }

    private void createUser(Teacher createdTeacher) {
        String password = RandomStringUtils.
                random(15, 97, 122, true, true, null, new SecureRandom());
        User user = new User();
        user.setTeacherId(createdTeacher.getId());
        user.setRole(Role.TEACHER);
        user.setUsername(createdTeacher.getName());
        user.setPassword(password);
        user.setEmail(createdTeacher.getName() + "#" + createdTeacher.getId());

        User createdUser = authenticationService.createUser(user);

        createFirstLogin(user, password);
        log.info("User created: {}, with password: {}", createdUser.toString(), password);
    }

    private void createFirstLogin(User user, String password) {
        FirstLogin firstLogin = new FirstLogin();
        firstLogin.setUserId(user.getId());
        firstLogin.setPassword(password);
        FirstLogin savedFirstLogin = firstLoginService.save(firstLogin);

        log.info("FirstLogin: {}", savedFirstLogin);
    }

    @Override
    public List<Teacher> findActive() {
        return repository.findByActiveTrue();
    }

    @Override
    public List<Teacher> findDisabled() {
        return repository.findByActiveFalse();
    }

    @Override
    public Teacher findById(Long id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public List<Teacher> findBySurname(String surname) {
        return repository.findBySurname(surname);
    }

    public boolean isCurrentUserIsTeacher(Long teacherId){
        User user = (User) AuthUtil.getCurrentUser();
        Teacher teacher = repository
                .findById(teacherId)
                .orElseThrow(() -> new TeacherNotFoundException("Teacher not found"));
        return Objects.equals(user.getTeacherId(), teacher.getId());
    }
}