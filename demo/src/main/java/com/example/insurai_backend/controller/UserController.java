//package com.example.insurai_backend.controller;
//
//import org.springframework.security.access.prepost.PreAuthorize;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("/api/dashboard")
//public class UserController {
//
//    @GetMapping("/customer")
//    @PreAuthorize("hasAuthority('ROLE_CUSTOMER')")
//    public String customerDashboard() {
//        return "Welcome to the Customer Dashboard!";
//    }
//
//    @GetMapping("/agent")
//    @PreAuthorize("hasAuthority('ROLE_AGENT')")
//    public String agentDashboard() {
//        return "Welcome to the Agent Dashboard!";
//    }
//
//    @GetMapping("/admin")
//    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
//    public String adminDashboard() {
//        return "Welcome to the Admin Dashboard!";
//    }
//}
