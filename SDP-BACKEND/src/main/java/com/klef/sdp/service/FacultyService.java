package com.klef.sdp.service;

import com.klef.sdp.entity.Faculty;
import com.klef.sdp.repository.FacultyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FacultyService {

    @Autowired
    private FacultyRepository repo;

    // Register faculty
    public Faculty register(Faculty faculty) {
        return repo.save(faculty);
    }

    // Login faculty
    public Faculty login(String email, String password) {
        return repo.findByEmailAndPassword(email, password);
    }

    // ✅ Get all faculty
    public List<Faculty> getAllFaculty() {
        return repo.findAll();
    }

    // ✅ Get faculty by id
    public Faculty getFacultyById(Long id) {
        return repo.findById(id).orElse(null);
    }

    // ✅ Update faculty
    public Faculty updateFaculty(Long id, Faculty faculty) {
        Faculty existing = repo.findById(id).orElse(null);
        if (existing != null) {
            existing.setName(faculty.getName());
            existing.setEmail(faculty.getEmail());
            existing.setPassword(faculty.getPassword());
            // add more fields if Faculty has them (department, subject, etc.)
            return repo.save(existing);
        }
        return null;
    }

    // ✅ Delete faculty
    public void deleteFaculty(Long id) {
        repo.deleteById(id);
    }
    public Faculty addFaculty(Faculty faculty) {
        return repo.save(faculty);
    }

}
