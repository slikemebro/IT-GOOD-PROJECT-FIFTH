package com.example.itfinalproject;

import com.example.itfinalproject.domain.Teacher;
import com.example.itfinalproject.repository.TeacherRepository;
import com.example.itfinalproject.repository.specification.TeacherSearchCriteria;
import com.example.itfinalproject.repository.specification.TeacherSpecification;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.junit.jupiter.api.Assertions.assertEquals;

@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@DataJpaTest
@Log4j2
class TestSpecification {

    private final TeacherRepository repository;

    @Autowired
    public TestSpecification(TeacherRepository repository) {
        this.repository = repository;
    }

    @Test
    void contextLoads() {
        TeacherSpecification specification = new TeacherSpecification(TeacherSearchCriteria.builder().id(1).name("Alex").surname("Bar").build());
        TeacherSpecification specification2 = new TeacherSpecification(TeacherSearchCriteria.builder().id(1).surname("Bar").build());
        TeacherSpecification specification3 = new TeacherSpecification(TeacherSearchCriteria.builder().id(1).build());
        Teacher excepted = repository.findById(1L).get();

        log.info("Predicate1: {}", repository.findAll(specification));
        log.info("Predicate2: {}", repository.findAll(specification2));
        log.info("Predicate3: {}", repository.findAll(specification3));

        assertEquals(excepted, repository.findAll(specification).get(0));
        assertEquals(excepted, repository.findAll(specification2).get(0));
        assertEquals(excepted, repository.findAll(specification3).get(0));
    }

}
