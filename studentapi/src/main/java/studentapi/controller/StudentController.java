package studentapi.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import jakarta.validation.Valid;

import java.util.List;

import studentapi.entity.Student;
import studentapi.service.StudentService;

@RestController
@RequestMapping("/api/students")
public class StudentController {

private final StudentService service;

public StudentController(StudentService service){
this.service = service;
}

@PostMapping
public ResponseEntity<Student> createStudent(@Valid @RequestBody Student student){
return ResponseEntity.status(201).body(service.createStudent(student));
}

@GetMapping
public ResponseEntity<List<Student>> getAllStudents(){
return ResponseEntity.ok(service.getAllStudents());
}

@GetMapping("/{id}")
public ResponseEntity<Student> getStudent(@PathVariable Long id){
return ResponseEntity.ok(service.getStudentById(id));
}

@PutMapping("/{id}")
public ResponseEntity<Student> updateStudent(@PathVariable Long id,
@Valid @RequestBody Student student){
return ResponseEntity.ok(service.updateStudent(id,student));
}

@DeleteMapping("/{id}")
public ResponseEntity<Void> deleteStudent(@PathVariable Long id){
service.deleteStudent(id);
return ResponseEntity.noContent().build();
}

}