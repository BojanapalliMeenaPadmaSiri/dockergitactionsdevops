package com.klef.sdp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.klef.sdp.entity.Student;
import com.klef.sdp.entity.Grade;
import com.klef.sdp.entity.Attendance;
import com.klef.sdp.service.StudentService;

import java.util.List;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(
    origins = "http://localhost:5173",
    allowedHeaders = "*",
    methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS}
)
public class StudentController {

    @Autowired
    private StudentService service;

    // Signup
    @PostMapping("/signup")
    public Student register(@RequestBody Student student) {
        return service.register(student);
    }

    @PostMapping("/login")
    public Student login(@RequestBody Student student) {
        Student found = service.login(student.getEmail(), student.getPassword());
        if (found == null) {
            throw new RuntimeException("Invalid credentials");
        }
        return found;
    }

    // ✅ Only fetching data
    @GetMapping("/{id}/grades")
    public List<Grade> getGrades(@PathVariable Long id) {
        return service.getGradesByStudentId(id);
    }

    @GetMapping("/{id}/attendance")
    public List<Attendance> getAttendance(@PathVariable Long id) {
        return service.getAttendanceByStudentId(id);
    }
 // Get all students
    @GetMapping
    public List<Student> getAllStudents() {
        return service.getAllStudents();
    }

    // Get single student
    @GetMapping("/{id}")
    public Student getStudentById(@PathVariable Long id) {
        return service.getStudentById(id);
    }

    // Update student
    @PutMapping("/{id}")
    public Student updateStudent(@PathVariable Long id, @RequestBody Student student) {
        return service.updateStudent(id, student);
    }

    // Delete student
    @DeleteMapping("/{id}")
    public String deleteStudent(@PathVariable Long id) {
        service.deleteStudent(id);
        return "Deleted student with id " + id;
    }
 // Add student (for admin usage)
    @PostMapping
    public Student addStudent(@RequestBody Student student) {
        return service.register(student);
    }

}
