package com.klef.sdp.repository;

import com.klef.sdp.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    Admin findByEmailAndPassword(String email, String password);
}
