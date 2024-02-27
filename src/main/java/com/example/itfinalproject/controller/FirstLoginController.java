package com.example.itfinalproject.controller;


import com.example.itfinalproject.domain.FirstLogin;
import com.example.itfinalproject.service.FirstLoginService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/v1/first-login")
public class FirstLoginController {

    private final FirstLoginService service;


    @GetMapping
    public ResponseEntity<FirstLogin> findByUserId(@RequestParam Long userId) {
        return ResponseEntity.ok(service.findByUserId(userId));
    }

    @PostMapping
    public ResponseEntity<FirstLogin> save(@RequestBody FirstLogin firstLogin) {
        return ResponseEntity.ok(service.save(firstLogin));
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteByUserId(@RequestParam Long userId) {
        service.deleteByUserId(userId);
        return ResponseEntity.ok().build();
    }

}
