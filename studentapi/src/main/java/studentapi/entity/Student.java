package studentapi.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
public class Student {

@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;

@NotBlank(message="Name cannot be empty")
private String name;

@Email(message="Invalid email")
private String email;

@Min(value=18,message="Age must be at least 18")
private int age;

public Student(){}

public Long getId(){ return id; }
public void setId(Long id){ this.id=id; }

public String getName(){ return name; }
public void setName(String name){ this.name=name; }

public String getEmail(){ return email; }
public void setEmail(String email){ this.email=email; }

public int getAge(){ return age; }
public void setAge(int age){ this.age=age; }
}