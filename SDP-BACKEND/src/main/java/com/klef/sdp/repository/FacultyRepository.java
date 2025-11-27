package com.klef.sdp.repository;

import com.klef.sdp.entity.Faculty;

import org.springframework.data.jpa.repository.JpaRepository;

public interface FacultyRepository extends JpaRepository<Faculty, Long> {
    Faculty findByEmailAndPassword(String email, String password);
}
