package com.klef.sdp.controller;

import com.klef.sdp.entity.Admin;
import com.klef.sdp.entity.Student;
import com.klef.sdp.entity.Faculty;
import com.klef.sdp.entity.Parent;
import com.klef.sdp.repository.StudentRepository;
import com.klef.sdp.repository.FacultyRepository;
import com.klef.sdp.repository.ParentRepository;
import com.klef.sdp.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*", allowCredentials = "false",originPatterns = "*")
public class AdminController {

    @Autowired
    private AdminService service;

    @Autowired
    private StudentRepository studentRepo;
    @Autowired
    private FacultyRepository facultyRepo;
    @Autowired
    private ParentRepository parentRepo;

    @PostMapping("/signup")
    public Admin register(@RequestBody Admin admin) {
        return service.register(admin);
    }

    @PostMapping("/login")
    public Admin login(@RequestBody Admin admin) {
        return service.login(admin.getEmail(), admin.getPassword());
    }

 // --- STUDENTS ---
    @GetMapping("/students")
    public List<Student> getAllStudents() {
        return studentRepo.findAll();
    }

    @PostMapping("/students")
    public Student addStudent(@RequestBody Student s) {
        return studentRepo.save(s);
    }

    @PutMapping("/students/{id}")
    public Student updateStudent(@PathVariable Long id, @RequestBody Student student) {
        student.setId(id);   // ensure correct ID
        return studentRepo.save(student);
    }
    @GetMapping("/students/{id}")
    public Student getStudentById(@PathVariable Long id) {
        return studentRepo.findById(id).orElse(null);
    }
    @DeleteMapping("/students/{id}")
    public void deleteStudent(@PathVariable Long id) {
        studentRepo.deleteById(id);
    }

    // --- FACULTY ---
    @GetMapping("/faculty")
    public List<Faculty> getAllFaculty() {
        return facultyRepo.findAll();
    }

    @PostMapping("/faculty")
    public Faculty addFaculty(@RequestBody Faculty f) {
        return facultyRepo.save(f);
    }

    @PutMapping("/faculty/{id}")
    public Faculty updateFaculty(@PathVariable Long id, @RequestBody Faculty faculty) {
        faculty.setId(id);
        return facultyRepo.save(faculty);
    }
    @GetMapping("/faculty/{id}")
    public Faculty getFacultyById(@PathVariable Long id) {
        return facultyRepo.findById(id).orElse(null);
    }
    @DeleteMapping("/faculty/{id}")
    public void deleteFaculty(@PathVariable Long id) {
        facultyRepo.deleteById(id);
    }

    // --- PARENTS ---
    @GetMapping("/parents")
    public List<Parent> getAllParents() {
        return parentRepo.findAll();
    }

    @PostMapping("/parents")
    public Parent addParent(@RequestBody Parent p) {
        return parentRepo.save(p);
    }

    @PutMapping("/parents/{id}")
    public Parent updateParent(@PathVariable Long id, @RequestBody Parent parent) {
        parent.setId(id);
        return parentRepo.save(parent);
    }
    @DeleteMapping("/parents/{id}")
    public void deleteParent(@PathVariable Long id) {
        parentRepo.deleteById(id);
    }
    @GetMapping("/parents/{id}")
    public Parent getParentById(@PathVariable Long id) {
        return parentRepo.findById(id).orElse(null);
    }
}
