package com.example.insurai_backend.repository;

import com.example.insurai_backend.model.Appointment;
import com.example.insurai_backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByCustomer(User customer);
    List<Appointment> findByAgent(User agent);
}
