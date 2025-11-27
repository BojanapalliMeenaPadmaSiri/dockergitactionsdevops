package com.klef.sdp.repository;

import com.klef.sdp.entity.Parent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ParentRepository extends JpaRepository<Parent, Long> {
    Parent findByEmailAndPassword(String email, String password);
}
