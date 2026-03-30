package com.Sample.Rest_API.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.Sample.Rest_API.Model.Student;

public interface StudentRepository extends JpaRepository<Student, Integer> {
}