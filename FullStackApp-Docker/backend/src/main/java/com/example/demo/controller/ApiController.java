package com.example.demo.controller;

import com.example.demo.model.Person;
import com.example.demo.repository.PersonRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class ApiController {
    private final PersonRepository repository;

    public ApiController(PersonRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/messages")
    public List<String> getMessages() {
        return repository.findAll()
                .stream()
                .map(person -> "Hello, " + person.getName() + "!")
                .collect(Collectors.toList());
    }

    @GetMapping("/health")
    public String health() {
        return "backend-ok";
    }
}
