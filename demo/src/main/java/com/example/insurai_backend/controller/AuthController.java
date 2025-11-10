//package com.example.insurai_backend.controller;
//
//import com.example.insurai_backend.model.User;
//import com.example.insurai_backend.service.AuthService;
//import com.example.insurai_backend.security.JwtUtil;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.*;
//import org.springframework.web.bind.annotation.*;
//
//import jakarta.servlet.http.Cookie;
//import jakarta.servlet.http.HttpServletResponse;
//
//import java.util.List;
//import java.util.Map;
//
//@RestController
//@RequestMapping("/api/auth")
//@CrossOrigin(origins = "${frontend.origin}", allowCredentials = "true")
//public class AuthController {
//
//    @Autowired private AuthService authService;
//    @Autowired private JwtUtil jwtUtil;
//
//    @PostMapping("/register")
//    public ResponseEntity<?> register(@RequestBody User user) {
//        authService.register(user);
//        return ResponseEntity.ok(Map.of("message","User registered"));
//    }
//
//    @PostMapping("/login")
//    public ResponseEntity<?> login(@RequestBody Map<String,String> body, HttpServletResponse response) {
//        String email = body.get("email");
//        String password = body.get("password");
//        String token = authService.login(email,password);
//
//        // set HttpOnly cookie
//        Cookie cookie = new Cookie("jwt", token);
//        cookie.setHttpOnly(true);
//        cookie.setPath("/");
//        cookie.setMaxAge(3600); // 1 hour
//        // In production set cookie.setSecure(true) and sameSite=Lax/Strict as needed
//
//        response.addCookie(cookie);
//
//        // return role and token in body (token in body optional, but role is useful)
//        String role = authService.findByEmail(email).getRole();
//        return ResponseEntity.ok(Map.of("token", token, "role", role));
//
//    }
//
//    @PostMapping("/logout")
//    public ResponseEntity<?> logout(HttpServletResponse response) {
//        Cookie cookie = new Cookie("jwt", "");
//        cookie.setHttpOnly(true);
//        cookie.setPath("/");
//        cookie.setMaxAge(0);
//        response.addCookie(cookie);
//        return ResponseEntity.ok(Map.of("message","Logged out"));
//    }
//    @GetMapping("/users")
//    public List<User> getAllUsers() {
//		return authService.getAllUsers();
//	}
//}


package com.example.insurai_backend.controller;

import com.example.insurai_backend.model.*;
import com.example.insurai_backend.service.AuthService;
import com.example.insurai_backend.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "${frontend.origin}", allowCredentials = "true")
public class AuthController {

    @Autowired private AuthService authService;
    @Autowired private JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestPart("user") User user,
                                      @RequestPart(value = "document", required = false) MultipartFile document) throws IOException {
        if (user.getRole() == Role.ROLE_AGENT || (user.getRole()!=null && user.getRole().name().equals("ROLE_AGENT"))) {
            if (document == null || document.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("message", "Agent registration requires a document upload"));
            }
            // save file to configured folder
            String uploadDir = System.getProperty("user.dir") + File.separator + "uploads";
            new File(uploadDir).mkdirs();
            String fileName = System.currentTimeMillis() + "_" + document.getOriginalFilename();
            File dest = new File(uploadDir, fileName);
            document.transferTo(dest);
            authService.registerAgent(user, dest.getAbsolutePath());
            return ResponseEntity.ok(Map.of("message", "Agent registered. Pending verification by admin."));
        } else {
            user.setRole(Role.ROLE_CUSTOMER);
            authService.registerUser(user);
            return ResponseEntity.ok(Map.of("message", "Customer registered successfully"));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String,String> body, HttpServletResponse response) {
        String email = body.get("email");
        String password = body.get("password");
        String token = authService.login(email, password);

        Cookie cookie = new Cookie("jwt", token);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge((int)(jwtUtil.getRole(token) != null ? 3600 : 3600));
        // in production: cookie.setSecure(true) and SameSite settings
        response.addCookie(cookie);

        String role = authService.findByEmail(email).getRole().name();
        boolean verified = authService.findByEmail(email).isVerified();
        return ResponseEntity.ok(Map.of("token", token, "role", role, "verified", verified));
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
}
