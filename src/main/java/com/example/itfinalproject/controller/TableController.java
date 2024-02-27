package com.example.itfinalproject.controller;

import com.example.itfinalproject.domain.Table;
import com.example.itfinalproject.dto.TeacherStudentTableDTO;
import com.example.itfinalproject.service.TableService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.OK;

@RequiredArgsConstructor
@Controller
@RequestMapping("/api/v1/table")
public class TableController {

    private final TableService tableService;

    @GetMapping
    public ResponseEntity<List<Table>> findAll(){
        return new ResponseEntity<>(tableService.findAll(), OK);
    }

    @GetMapping("/names")
    public ResponseEntity<List<TeacherStudentTableDTO>> findAllTables() {
        return new ResponseEntity<>(tableService.findNamesTable(), OK);
    }

    @GetMapping("/id")
    public ResponseEntity<Table> findById(@RequestParam Long id) {
        return new ResponseEntity<>(tableService.findById(id), OK);
    }

    @GetMapping("/teacher")
    @PreAuthorize("hasAuthority('ADMIN') or @tableServiceImpl.isCurrentUserIsOwnerOfTable(#teacherId)")
    public ResponseEntity<List<Table>> findByTeacherId(@RequestParam Long teacherId) {
        return new ResponseEntity<>(tableService.findByTeacherId(teacherId), OK);
    }

    @PostMapping
    public ResponseEntity<Table> saveOrUpdate(@RequestBody Table table) {
        return new ResponseEntity<>(tableService.saveOrUpdate(table), OK);
    }

}
