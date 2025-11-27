package com.klef.sdp.service;

import com.klef.sdp.entity.Attendance;
import com.klef.sdp.entity.Grade;
import com.klef.sdp.entity.Student;
import com.klef.sdp.repository.AttendanceRepository;
import com.klef.sdp.repository.GradeRepository;
import com.klef.sdp.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepo;

    @Autowired
    private GradeRepository gradeRepo;

    @Autowired
    private AttendanceRepository attendanceRepo;

    // Register a new student
    public Student register(Student student) {
        return studentRepo.save(student);
    }

    // Login student by email + password
    public Student login(String email, String password) {
        return studentRepo.findByEmailAndPassword(email, password);
    }

    // Get all students
    public List<Student> getAllStudents() {
        return studentRepo.findAll();
    }

    public Student addStudent(Student student) {
        return studentRepo.save(student);
    }

    public Student updateStudent(Long id, Student updated) {
        Student existing = studentRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        existing.setName(updated.getName());
        existing.setEmail(updated.getEmail());
        existing.setPassword(updated.getPassword());

        return studentRepo.save(existing);
    }

    public void deleteStudent(Long id) {
        studentRepo.deleteById(id);
    }

 // Get grades by student
    public List<Grade> getGradesByStudentId(Long id) {
        return gradeRepo.findByStudentId(id);
    }

   
    public Student getStudentById(Long id) {
        return studentRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));
    }

    // Attendance Methods
    public List<Attendance> getAttendanceByStudentId(Long id) {
        return attendanceRepo.findByStudentId(id);
    }

    public Attendance addAttendance(Long id, Attendance attendance) {
        Student student = studentRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        // ensure date is set
        LocalDate date = attendance.getDate();
        if (date == null) {
            date = LocalDate.now();
            attendance.setDate(date);
        }

        // Prevent duplicate attendance for the same student + date
        boolean exists = attendanceRepo.findByStudentAndDate(student, date).isPresent();
        if (exists) {
            throw new RuntimeException("Attendance already marked for " + date.toString());
        }

        attendance.setStudent(student);
        return attendanceRepo.save(attendance);
    }
 // Add grade for a student
    public Grade addGrade(Long studentId, Grade grade) {
        Student student = studentRepo.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        grade.setStudent(student);

        // ✅ Auto-generate grade letter based on marks
        int marks = grade.getMarks();
        if (marks >= 90) grade.setGrade("A+");
        else if (marks >= 75) grade.setGrade("A");
        else if (marks >= 60) grade.setGrade("B");
        else if (marks >= 50) grade.setGrade("C");
        else grade.setGrade("F");

        return gradeRepo.save(grade);
    }

}
