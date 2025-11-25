package com.example.insurai_backend.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @GetMapping("/customer")
    @PreAuthorize("hasAuthority('ROLE_CUSTOMER')")
    public String customerDashboard() { return "Customer dashboard data"; }

    @GetMapping("/agent")
    @PreAuthorize("hasAuthority('ROLE_AGENT')")
    public String agentDashboard() { return "Agent dashboard data"; }

    @GetMapping("/admin")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public String adminDashboard() { return "Admin dashboard data"; }
}
