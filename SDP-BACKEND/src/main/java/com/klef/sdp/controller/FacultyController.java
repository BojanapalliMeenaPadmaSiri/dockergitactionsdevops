package com.klef.sdp.controller;

import com.klef.sdp.entity.Attendance;
import com.klef.sdp.entity.Faculty;
import com.klef.sdp.entity.Student;
import com.klef.sdp.entity.Parent;
import com.klef.sdp.entity.Grade;
import com.klef.sdp.service.FacultyService;
import com.klef.sdp.service.StudentService;
import com.klef.sdp.service.ParentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/faculty")
@CrossOrigin(
    origins = "http://localhost:5173",
    allowedHeaders = "*",
    originPatterns = "*",
    methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS}
)
public class FacultyController {

    @Autowired
    private FacultyService facultyService;

    @Autowired
    private StudentService studentService;

    @Autowired
    private ParentService parentService;

    // ---------------- Faculty Auth ----------------
    @PostMapping("/signup")
    public Faculty register(@RequestBody Faculty faculty) {
        return facultyService.register(faculty);
    }

    @PostMapping("/login")
    public Faculty login(@RequestBody Faculty faculty) {
        return facultyService.login(faculty.getEmail(), faculty.getPassword());
    }

    // ---------------- CRUD on Students ----------------
    @GetMapping("/students")
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }

    @PostMapping("/students")
    public Student addStudent(@RequestBody Student student) {
        return studentService.addStudent(student);
    }

    @PutMapping("/students/{id}")
    public Student updateStudent(@PathVariable Long id, @RequestBody Student student) {
        return studentService.updateStudent(id, student);
    }

    @DeleteMapping("/students/{id}")
    public String deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
        return "Deleted student with id " + id;
    }

    // ---------------- CRUD on Parents ----------------
    @GetMapping("/parents")
    public List<Parent> getAllParents() {
        return parentService.getAllParents();
    }

    @PostMapping("/parents")
    public Parent addParent(@RequestBody Parent parent) {
        return parentService.addParent(parent);
    }

    @PutMapping("/parents/{id}")
    public Parent updateParent(@PathVariable Long id, @RequestBody Parent parent) {
        return parentService.updateParent(id, parent);
    }

    @DeleteMapping("/parents/{id}")
    public String deleteParent(@PathVariable Long id) {
        return parentService.deleteParent(id);
    }

    // ---------------- Grades & Attendance by Faculty ----------------
    @PostMapping("/students/{id}/grades")
    public Grade addGrade(@PathVariable Long id, @RequestBody Grade grade) {
        return studentService.addGrade(id, grade);
    }

    @PostMapping("/students/{id}/attendance")
    public Attendance markAttendance(@PathVariable Long id, @RequestBody Attendance attendance) {
        return studentService.addAttendance(id, attendance);
    }
 // Get all faculty
    @GetMapping
    public List<Faculty> getAllFaculty() {
        return facultyService.getAllFaculty();
    }

    // Get one faculty
    @GetMapping("/{id}")
    public Faculty getFacultyById(@PathVariable Long id) {
        return facultyService.getFacultyById(id);
    }

    // Update faculty
    @PutMapping("/{id}")
    public Faculty updateFaculty(@PathVariable Long id, @RequestBody Faculty faculty) {
        return facultyService.updateFaculty(id, faculty);
    }

    // Delete faculty
    @DeleteMapping("/{id}")
    public String deleteFaculty(@PathVariable Long id) {
        facultyService.deleteFaculty(id);
        return "Deleted faculty with id " + id;
    }
    @PostMapping
    public Faculty addFaculty(@RequestBody Faculty faculty) {
        return facultyService.addFaculty(faculty);
    }


}
