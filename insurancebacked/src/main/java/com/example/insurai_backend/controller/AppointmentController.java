package com.example.insurai_backend.controller;

import com.example.insurai_backend.model.*;
import com.example.insurai_backend.service.AppointmentService;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    private final AppointmentService service;

    public AppointmentController(AppointmentService service) {
        this.service = service;
    }

    // CUSTOMER → BOOK APPOINTMENT
    @PostMapping("/book/{agentId}")
    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    public Appointment book(@PathVariable Long agentId,
                            @RequestBody Appointment dto) {
        return service.bookAppointment(agentId, dto);
    }

    // CUSTOMER → VIEW THEIR APPOINTMENTS
    @GetMapping("/customer")
    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    public List<Appointment> customerAppointments() {
        return service.getCustomerAppointments();
    }

    // AGENT → VIEW THEIR APPOINTMENTS
    @GetMapping("/agent")
    @PreAuthorize("hasRole('ROLE_AGENT')")
    public List<Appointment> agentAppointments() {
        return service.getAgentAppointments();
    }

    // AGENT → CHANGE STATUS
    @PutMapping("/status/{id}")
    @PreAuthorize("hasRole('ROLE_AGENT')")
    public Appointment changeStatus(@PathVariable Long id,
                                    @RequestParam AppointmentStatus status) {
        return service.updateStatus(id, status);
    }
}
