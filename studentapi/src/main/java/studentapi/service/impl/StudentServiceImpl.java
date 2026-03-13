package studentapi.service.impl;

import org.springframework.stereotype.Service;
import java.util.List;

import studentapi.entity.Student;
import studentapi.repository.StudentRepository;
import studentapi.service.StudentService;

@Service
public class StudentServiceImpl implements StudentService {

private final StudentRepository repository;

public StudentServiceImpl(StudentRepository repository){
this.repository = repository;
}

@Override
public Student createStudent(Student student){
return repository.save(student);
}

@Override
public List<Student> getAllStudents(){
return repository.findAll();
}

@Override
public Student getStudentById(Long id){
return repository.findById(id)
.orElseThrow(() -> new RuntimeException("Student not found"));
}

@Override
public Student updateStudent(Long id, Student student){

Student existing = getStudentById(id);

existing.setName(student.getName());
existing.setEmail(student.getEmail());
existing.setAge(student.getAge());

return repository.save(existing);
}

@Override
public void deleteStudent(Long id){
repository.deleteById(id);
}

}