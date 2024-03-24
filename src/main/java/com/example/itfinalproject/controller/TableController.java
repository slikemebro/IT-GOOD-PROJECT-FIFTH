package com.example.itfinalproject.controller;

import com.example.itfinalproject.domain.Table;
import com.example.itfinalproject.dto.TeacherStudentTableDTO;
import com.example.itfinalproject.service.TableService;
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
@RequestMapping("/api/v1/table")
public class TableController {

    private final TableService tableService;

    @GetMapping
    public ResponseEntity<List<Table>> findAll() {
        log.info("findAll tables");
        return new ResponseEntity<>(tableService.findAll(), OK);
    }

    @GetMapping("/names")
    public ResponseEntity<List<TeacherStudentTableDTO>> findAllTables() {
        log.info("findAll teacher student tables");
        return new ResponseEntity<>(tableService.findNamesTable(), OK);
    }

    @GetMapping("/id")
    public ResponseEntity<Table> findById(@RequestParam Long id) {
        log.info("find table by id: {}", id);
        return new ResponseEntity<>(tableService.findById(id), OK);
    }

    @GetMapping("/teacher")
    @PreAuthorize("hasAuthority('ADMIN') or @tableServiceImpl.isUserOwnerOfTable(#teacherId)")
    public ResponseEntity<List<Table>> findByTeacherId(@RequestParam Long teacherId) {
        log.info("find table by teacher id: {}", teacherId);
        return new ResponseEntity<>(tableService.findByTeacherId(teacherId), OK);
    }

    @PostMapping
    public ResponseEntity<Table> saveOrUpdate(@RequestBody Table table) {
        log.info("save or update table: {}", table);
        return new ResponseEntity<>(tableService.saveOrUpdate(table), OK);
    }

}
