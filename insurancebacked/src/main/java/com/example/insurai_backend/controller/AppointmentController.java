package com.example.insurai_backend.controller;

import com.example.insurai_backend.model.*;
import com.example.insurai_backend.service.AppointmentService;
import com.example.insurai_backend.service.AuthService;
import com.example.insurai_backend.repository.AppointmentRepository;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    private final AppointmentService service;
    private final AuthService authService;
    private final AppointmentRepository appointmentRepo;

    public AppointmentController(AppointmentService service,
                                 AuthService authService,
                                 AppointmentRepository appointmentRepo) {
        this.service = service;
        this.authService = authService;
        this.appointmentRepo = appointmentRepo;
    }

    // ===============================
    // CUSTOMER → BOOK APPOINTMENT
    // ===============================
    @PostMapping("/book/{agentId}")
    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    public Appointment book(@PathVariable Long agentId,
                            @RequestBody Appointment dto) {
        return service.bookAppointment(agentId, dto);
    }

    // ===============================
    // CUSTOMER → THEIR APPOINTMENTS
    // ===============================
    @GetMapping("/customer")
    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    public List<Appointment> customerAppointments() {
        return service.getCustomerAppointments();
    }

    // ===============================
    // AGENT → THEIR APPOINTMENTS
    // ===============================
    @GetMapping("/agent")
    @PreAuthorize("hasRole('ROLE_AGENT')")
    public List<Appointment> agentAppointments() {
        return service.getAgentAppointments();
    }

    // ===============================
    // AGENT → CHANGE STATUS
    // ===============================
    @PutMapping("/status/{id}")
    @PreAuthorize("hasRole('ROLE_AGENT')")
    public Appointment changeStatus(@PathVariable Long id,
                                    @RequestParam AppointmentStatus status) {
        return service.updateStatus(id, status);
    }

    // ===============================
    // 📊 AGENT DASHBOARD → STATS API
    // ===============================
    @GetMapping("/agent/stats")
    @PreAuthorize("hasRole('ROLE_AGENT')")
    public Map<String, Object> getAgentStats() {

        User agent = authService.getCurrentUser();
        List<Appointment> apps = appointmentRepo.findByAgent(agent);

        long total = apps.size();
        long completed = apps.stream().filter(a -> a.getStatus() == AppointmentStatus.COMPLETED).count();
        long pending = apps.stream().filter(a -> a.getStatus() == AppointmentStatus.PENDING).count();
        long cancelled = apps.stream().filter(a -> a.getStatus() == AppointmentStatus.CANCELLED).count();

        // ---------- WEEKLY CHART ----------
        List<Map<String, Object>> weekly = apps.stream()
                .collect(Collectors.groupingBy(
                        a -> a.getDate().getDayOfWeek().name(),
                        Collectors.counting()
                ))
                .entrySet()
                .stream()
                .map(e -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("day", e.getKey());
                    map.put("count", e.getValue());
                    return map;
                })
                .collect(Collectors.toList());

        // ---------- TYPE DISTRIBUTION ----------
        List<Map<String, Object>> typeChart = apps.stream()
                .collect(Collectors.groupingBy(Appointment::getReason, Collectors.counting()))
                .entrySet()
                .stream()
                .map(e -> {
                    Map<String, Object> obj = new HashMap<>();
                    obj.put("type", e.getKey());
                    obj.put("value", e.getValue());
                    return obj;
                })
                .collect(Collectors.toList());

        // ---------- METRICS ----------
        Map<String, Object> metrics = new HashMap<>();
        metrics.put("total", total);
        metrics.put("completed", completed);
        metrics.put("pending", pending);
        metrics.put("cancelled", cancelled);

        // ---------- FINAL RESPONSE ----------
        Map<String, Object> response = new HashMap<>();
        response.put("metrics", metrics);
        response.put("weeklyChart", weekly);
        response.put("typeChart", typeChart);

        return response;
    }
}
