package com.klef.sdp.service;

import com.klef.sdp.entity.Parent;
import com.klef.sdp.repository.ParentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ParentService {

    @Autowired
    private ParentRepository repo;

    // Register (signup)
    public Parent register(Parent parent) {
        return repo.save(parent);
    }

    // Login
    public Parent login(String email, String password) {
        return repo.findByEmailAndPassword(email, password);
    }

    // Faculty CRUD → Get all
    public List<Parent> getAllParents() {
        return repo.findAll();
    }

    // Faculty CRUD → Add new
    public Parent addParent(Parent parent) {
        return repo.save(parent);
    }

    public Parent updateParent(Long id, Parent parent) {
        Parent existing = repo.findById(id).orElseThrow(() -> new RuntimeException("Parent not found"));
        existing.setName(parent.getName());
        existing.setEmail(parent.getEmail());
        existing.setPassword(parent.getPassword());
        return repo.save(existing);
    }

    // Faculty CRUD → Delete
    public String deleteParent(Long id) {
        repo.deleteById(id);
        return "Parent with ID " + id + " deleted";
    }
}
