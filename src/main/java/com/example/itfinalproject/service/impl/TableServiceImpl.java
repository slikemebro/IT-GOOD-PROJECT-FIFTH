package com.example.itfinalproject.service.impl;

import com.example.itfinalproject.domain.Student;
import com.example.itfinalproject.domain.Table;
import com.example.itfinalproject.domain.Teacher;
import com.example.itfinalproject.domain.User;
import com.example.itfinalproject.dto.TeacherStudentTableDTO;
import com.example.itfinalproject.exception.TableNotFoundException;
import com.example.itfinalproject.repository.TableRepository;
import com.example.itfinalproject.service.BaseEmployeeService;
import com.example.itfinalproject.service.TableService;
import com.example.itfinalproject.util.AuthUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class TableServiceImpl implements TableService {

    private final TableRepository repository;
    private final BaseEmployeeService<Teacher> teacherService;
    private final BaseEmployeeService<Student> studentService;

    @Override
    public List<Table> findAll() {
        return repository.findAll();
    }

    @Override
    public List<Table> findByStudentId(Long studentId) {
        return repository.findByStudentId(studentId);
    }

    @Override
    public List<Table> findByTeacherId(Long teacherId) {
        return repository.findByTeacherId(teacherId);
    }

    @Override
    public List<TeacherStudentTableDTO> findNamesTable() {
        List<Table> tables = repository.findAll();
        List<TeacherStudentTableDTO> dtos = new ArrayList<>(tables.size());


        for (Table table: tables) {
            TeacherStudentTableDTO tStable = new TeacherStudentTableDTO();
            Teacher teacher = teacherService.findById(table.getTeacherId());
            Student student = studentService.findById(table.getStudentId());

            if (teacher != null && student != null) {
                tStable.setStudentName(student.getSurname() + " " + student.getName());
                tStable.setTeacherName(teacher.getSurname() + " " + teacher.getName());
                tStable.setStudentId(student.getId());
                tStable.setTeacherId(teacher.getId());
                tStable.setTableId(table.getId());
                tStable.setActive(table.getActive());

                dtos.add(tStable);
            }
        }

        return dtos;
    }

    @Override
    public Table findById(Long id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public Table saveOrUpdate(Table table) {
        Table tableUpsert = table;
        if (tableUpsert.getId() != null) {
            tableUpsert = repository.findById(table.getId()).get();

            tableUpsert.setActive(table.getActive());
            tableUpsert.setStudentId(table.getStudentId());
            tableUpsert.setTeacherId(table.getTeacherId());
            tableUpsert.setLessonIds(table.getLessonIds());
        }

        return repository.save(tableUpsert);
    }

    public boolean isCurrentUserIsOwnerOfTable(Long teacherID) {
        User user = (User) AuthUtil.getCurrentUser();
        List<Table> tableList = repository.findByTeacherId(teacherID);

        for (Table table : tableList) {
            if (Objects.equals(user.getTeacherId(), table.getTeacherId())) {
                return true;
            }
        }
        throw new TableNotFoundException("Table not found");
    }
}
