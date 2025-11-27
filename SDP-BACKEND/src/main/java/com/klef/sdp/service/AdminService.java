package com.klef.sdp.service;

import com.klef.sdp.entity.Admin;
import com.klef.sdp.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    @Autowired
    private AdminRepository repo;

    public Admin register(Admin admin) {
        return repo.save(admin);
    }

    public Admin login(String email, String password) {
        return repo.findByEmailAndPassword(email, password);
    }
}
