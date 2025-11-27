package com.klef.sdp.repository;

import com.klef.sdp.entity.Attendance;
import com.klef.sdp.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    List<Attendance> findByStudentId(Long studentId);
    Optional<Attendance> findByStudentAndDate(Student student, LocalDate date);
}
