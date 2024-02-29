package com.example.itfinalproject.service.impl;

import com.example.itfinalproject.domain.LessonsBalance;
import com.example.itfinalproject.domain.Student;
import com.example.itfinalproject.domain.Table;
import com.example.itfinalproject.domain.User;
import com.example.itfinalproject.dto.StudentDTO;
import com.example.itfinalproject.exception.TableNotFoundException;
import com.example.itfinalproject.repository.LessonsBalanceRepository;
import com.example.itfinalproject.repository.StudentRepository;
import com.example.itfinalproject.repository.TableRepository;
import com.example.itfinalproject.service.BaseEmployeeService;
import com.example.itfinalproject.service.LessonsBalanceService;
import com.example.itfinalproject.util.AuthUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class StudentServiceImpl implements BaseEmployeeService<Student> {

    private final StudentRepository repository;
    private final LessonsBalanceService lessonsBalanceService;
    private final LessonsBalanceRepository lessonsBalanceRepository;
    private final TableRepository tableRepository;


    @Override
    public List<Student> findAll() {
        return repository.findAll();
    }

    @Override
    public List<StudentDTO> findAllWithLessonsBalance() {
        List<Student> students = repository.findAll();
        List<StudentDTO> studentDTOS = new ArrayList<>(students.size());

        for (Student student: students) {
            StudentDTO studentDTO = new StudentDTO();

            studentDTO.setId(student.getId());
            studentDTO.setName(student.getName());
            studentDTO.setSurname(student.getSurname());
            studentDTO.setAge(student.getAge());
            studentDTO.setActive(student.getActive());
            studentDTO.setLessonsAmount(lessonsBalanceService.findByStudent(student.getId()).getLessonsBalance());
            studentDTO.setContacts(student.getContacts());

            studentDTOS.add(studentDTO);
        }

        return studentDTOS;
    }

    @Override
    @Transactional
    public Student updateOrSave(Student student) {
        Student savedOrUpdated = repository.save(student);
        Optional<LessonsBalance> balanceOptional = lessonsBalanceRepository.findByStudentId(student.getId());
        if (balanceOptional.isEmpty()) {
            LessonsBalance balance = new LessonsBalance();
            balance.setLessonsBalance(0);
            balance.setStudentId(savedOrUpdated.getId());
            lessonsBalanceRepository.save(balance);
        }

        return savedOrUpdated;
    }

    @Override
    public List<Student> findActive() {
        return repository.findByActiveTrue();
    }

    @Override
    public List<Student> findDisabled() {
        return repository.findByActiveFalse();
    }

    @Override
    public Student findById(Long id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public List<Student> findBySurname(String surname) {
        return repository.findBySurname(surname);
    }

    public boolean isCurrentUserIsTeacherOfStudent(Long studentId){
        User user = AuthUtil.getCurrentUser();
        List<Table> tableList = tableRepository.findByStudentId(studentId);

        for (Table table : tableList) {
            if (Objects.equals(table.getTeacherId(), user.getTeacherId())) {
                return true;
            }
        }

        throw new TableNotFoundException("Table not found");
    }
}
