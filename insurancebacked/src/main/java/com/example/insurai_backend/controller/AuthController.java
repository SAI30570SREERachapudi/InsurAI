package com.example.insurai_backend.controller;

import com.example.insurai_backend.model.Role;
import com.example.insurai_backend.model.User;
import com.example.insurai_backend.service.AuthService;
import com.example.insurai_backend.util.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "${frontend.origin}", allowCredentials = "true")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired private FileStorageService fileStorageService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestPart("user") User user,
                                      @RequestPart(value = "document", required = false) MultipartFile document) throws IOException {

        if (user.getRole() == Role.ROLE_AGENT) {
            if (document == null || document.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("message", "Agent registration requires a document upload"));
            }
            String stored = fileStorageService.storeFile(document);
            authService.registerAgent(user, stored);
            return ResponseEntity.ok(Map.of("message", "Agent registered. Pending verification by admin."));
        } else {
            // fallback to customer registration
            user.setRole(Role.ROLE_CUSTOMER);
            authService.registerUser(user);
            return ResponseEntity.ok(Map.of("message", "Customer registered successfully"));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String,String> body, HttpServletResponse response) {
        try {
            String email = body.get("email");
            String password = body.get("password");
            String token = authService.login(email, password);

            Cookie cookie = new Cookie("jwt", token);
            cookie.setHttpOnly(true);
            cookie.setPath("/");
            cookie.setMaxAge(3600);
            response.addCookie(cookie);

            User u = authService.findByEmail(email);
            return ResponseEntity.ok(Map.of("token", token, "role", u.getRole().name(), "verified", u.isVerified()));
        } catch (RuntimeException ex) {
            return ResponseEntity.status(401).body(Map.of("message", ex.getMessage()));
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        Cookie cookie = new Cookie("jwt", "");
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        response.addCookie(cookie);
        return ResponseEntity.ok(Map.of("message","Logged out"));
    }

    @GetMapping("/users")
    public java.util.List<User> getAllUsers() {
        return authService.getAllUsers();
    }

    @GetMapping("/pending-agents")
    public java.util.List<User> pendingAgents() {
    	return authService.getPendingAgents();
    }
 // =========================
//  PROFILE & PASSWORD APIs
// =========================

@GetMapping("/me")
public User getLoggedUser() {
    return authService.getCurrentUser();
}

@PutMapping("/update")
public User updateProfile(@RequestBody User updated) {
    return authService.updateProfile(updated);
}

@PostMapping("/password/request-otp")
public String requestOtp(@RequestBody Map<String,String> body) {
    return authService.requestPasswordOtp(body.get("oldPassword"));
}

@PostMapping("/password/verify")
public String verifyOtp(@RequestBody Map<String,String> body) {
    return authService.verifyPasswordOtp(body.get("otp"), body.get("newPassword"));
}

}
