//package com.example.insurai_backend.controller;
//
//public class AdminController {
//
//}
package com.example.insurai_backend.controller;

import com.example.insurai_backend.model.User;
import com.example.insurai_backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasAuthority('ROLE_ADMIN')")
public class AdminController {

    @Autowired private AuthService authService;

    @GetMapping("/pending-agents")
    public List<User> pendingAgents() {
        return authService.findPendingAgents();
    }

    @PutMapping("/verify-agent/{id}")
    public ResponseEntity<?> verifyAgent(@PathVariable Long id) {
        authService.verifyAgent(id);
        return ResponseEntity.ok().body(Map.of("message","Agent verified"));
    }
}
