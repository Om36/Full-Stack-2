package studentapi.service;

import java.util.List;
import studentapi.entity.Student;

public interface StudentService {

Student createStudent(Student student);

List<Student> getAllStudents();

Student getStudentById(Long id);

Student updateStudent(Long id, Student student);

void deleteStudent(Long id);

}