//package com.example.insurai_backend.controller;
//
//public class AdminController {
//
//}
package com.example.insurai_backend.controller;

import com.example.insurai_backend.model.User;
import com.example.insurai_backend.service.AgentService;
import com.example.insurai_backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "${frontend.origin}", allowCredentials = "true")
public class AdminController {

    @Autowired private AgentService agentService;
    @Autowired private AuthService authService;

    @GetMapping("/pending-agents")
    public List<User> getPendingAgents() {
        return agentService.getPendingAgents();
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return authService.getAllUsers();
    }

    @PutMapping("/approve/{id}")
    public ResponseEntity<?> approve(@PathVariable Long id) {
        agentService.approveAgent(id);
        return ResponseEntity.ok(Map.of("message","Agent approved"));
    }

    @PutMapping("/reject/{id}")
    public ResponseEntity<?> reject(@PathVariable Long id) {
        agentService.rejectAgent(id);
        return ResponseEntity.ok(Map.of("message","Agent rejected"));
    }
    @PutMapping("/reject/{id}")
    public ResponseEntity<?> rejectAgent(
            @PathVariable Long id,
            @RequestBody Map<String, String> body
    ) {
        String reason = body.get("reason");

        if (reason == null || reason.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Rejection reason is required"));
        }

        authService.rejectAgent(id, reason);
        return ResponseEntity.ok(Map.of("message", "Agent Rejected"));
    }

}
