package com.klef.sdp.controller;

import com.klef.sdp.entity.Parent;
import com.klef.sdp.entity.Student;
import com.klef.sdp.service.ParentService;
import com.klef.sdp.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/parents")
@CrossOrigin(origins = "*",
originPatterns = "*",
allowedHeaders = "*")
public class ParentController {

    @Autowired
    private ParentService parentService;

    @Autowired
    private StudentService studentService;

    @PostMapping("/signup")
    public Parent register(@RequestBody Parent parent) {
        return parentService.register(parent);
    }

    @PostMapping("/login")
    public Parent login(@RequestBody Parent parent) {
        return parentService.login(parent.getEmail(), parent.getPassword());
    }

    @GetMapping
    public List<Parent> getAllParents() {
        return parentService.getAllParents();
    }

    @PostMapping
    public Parent addParent(@RequestBody Parent parent) {
        return parentService.addParent(parent);
    }

    @PutMapping("/{id}")
    public Parent updateParent(@PathVariable Long id, @RequestBody Parent parent) {
        return parentService.updateParent(id, parent);
    }

    @DeleteMapping("/{id}")
    public String deleteParent(@PathVariable Long id) {
        return parentService.deleteParent(id);
    }

    // Parent fetching student info
    @GetMapping("/student/{id}")
    public Student getStudentById(@PathVariable Long id) {
        return studentService.getStudentById(id);
    }
}
