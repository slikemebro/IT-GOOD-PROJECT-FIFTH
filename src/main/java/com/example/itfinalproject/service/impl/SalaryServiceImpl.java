package com.example.itfinalproject.service.impl;

import com.example.itfinalproject.domain.Salary;
import com.example.itfinalproject.domain.Teacher;
import com.example.itfinalproject.domain.User;
import com.example.itfinalproject.dto.SalaryDto;
import com.example.itfinalproject.exception.SalaryNotFoundException;
import com.example.itfinalproject.repository.SalaryRepository;
import com.example.itfinalproject.repository.TeacherRepository;
import com.example.itfinalproject.service.SalaryService;
import com.example.itfinalproject.util.AuthUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Service
@Log4j2
@RequiredArgsConstructor
public class SalaryServiceImpl implements SalaryService {

    private final SalaryRepository repository;
    private final TeacherRepository teacherRepository;

    @Override
    public List<SalaryDto> findByTeacherId(Long teacherId) {
        List<Salary> salaryList = repository.findByTeacherId(teacherId);
        log.info("Salary list by teacher id: {}", teacherId);
        return getSalaryDtos(salaryList);
    }

    @Override
    public List<SalaryDto> findAll() {
        List<Salary> salaryList = repository.findAll();
        log.info("All salary list");
        return getSalaryDtos(salaryList);
    }

    @Override
    @Transactional
    public SalaryDto save(SalaryDto salaryDto) {
        Teacher teacher = teacherRepository.findById(salaryDto.getTeacherId())
                .orElseThrow(() -> new SalaryNotFoundException("Teacher not found"));
        Salary salary = getSalary(salaryDto, teacher);
        log.info("Salary saved: {}", salaryDto);
        return getSalaryDto(repository.save(salary));
    }

    private Salary getSalary(SalaryDto salaryDto, Teacher teacher) {
        Salary salary = new Salary();
        salary.setAmount(salaryDto.getAmount());
        salary.setTeacher(teacher);
        salary.setDateTime(Instant.parse(salaryDto.getDateTime()));
        return salary;
    }

    private List<SalaryDto> getSalaryDtos(List<Salary> salaryList) {
        List<SalaryDto> salaryDtoList = new ArrayList<>();
        for (Salary salary : salaryList) {
            salaryDtoList.add(getSalaryDto(salary));
        }
        log.info("Salary converted to DTOs: {}", salaryDtoList.size());
        return salaryDtoList;
    }

    private SalaryDto getSalaryDto(Salary saveSalary) {
        SalaryDto salaryDto = new SalaryDto();
        salaryDto.setAmount(saveSalary.getAmount());
        salaryDto.setDateTime(saveSalary.getDateTime().toString());
        salaryDto.setTeacherId(saveSalary.getTeacher().getId());
        salaryDto.setTeacherName(saveSalary.getTeacher().getName());
        salaryDto.setTeacherSurname(saveSalary.getTeacher().getSurname());

        log.info("Salary converted to DTO: {}", salaryDto);
        return salaryDto;
    }

    public boolean isCurrentUserIsOwnerOfSalary(Long teacherID) {
        User user = AuthUtil.getCurrentUser();
        log.info("Checking if user is owner of salary: {}", teacherID);
        return user.getTeacherId().equals(teacherID);
    }
}
