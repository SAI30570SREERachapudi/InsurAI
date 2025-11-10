//package com.example.insurai_backend.service;
//
//import com.example.insurai_backend.model.User;
//import com.example.insurai_backend.repository.UserRepository;
//import com.example.insurai_backend.security.JwtUtil;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//import java.util.Optional;
//
//@Service
//public class AuthService {
//
//    @Autowired private UserRepository userRepository;
//    @Autowired private PasswordEncoder passwordEncoder;
//    @Autowired private JwtUtil jwtUtil;
//
//    public void register(User user) {
//        Optional<User> existing = userRepository.findByEmail(user.getEmail());
//        if (existing.isPresent()) {
//            throw new RuntimeException("Email already in use");
//        }
//        // default role
//        if (user.getRole() == null) user.setRole("ROLE_USER");
//        user.setPassword(passwordEncoder.encode(user.getPassword()));
//        userRepository.save(user);
//    }
//
//    public String login(String email, String password) {
//        User u = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("Invalid credentials"));
//        if (!passwordEncoder.matches(password, u.getPassword())) throw new RuntimeException("Invalid credentials");
//        return jwtUtil.generateToken(email, u.getRole());
//    }
//
//    public User findByEmail(String email) {
//        return userRepository.findByEmail(email).orElse(null);
//    }
//    public List<User> getAllUsers() {
//		return userRepository.findAll();
//	}
//}
//


package com.example.insurai_backend.service;

import com.example.insurai_backend.model.*;
import com.example.insurai_backend.repository.UserRepository;
import com.example.insurai_backend.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AuthService {
    @Autowired private UserRepository userRepo;
    @Autowired private PasswordEncoder passwordEncoder;
    @Autowired private JwtUtil jwtUtil;

    public void registerUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        if (user.getRole()==null) user.setRole(Role.ROLE_CUSTOMER);
        userRepo.save(user);
    }

    public String login(String email, String password) {
        Optional<User> opt = userRepo.findByEmail(email);
        if (opt.isEmpty()) throw new RuntimeException("Invalid credentials");
        User user = opt.get();
        if (!passwordEncoder.matches(password, user.getPassword())) throw new RuntimeException("Invalid credentials");
        return jwtUtil.generateToken(user.getEmail(), user.getRole().name());
    }

    public User findByEmail(String email) {
        return userRepo.findByEmail(email).orElse(null);
    }

    public List<User> getAllUsers() { return userRepo.findAll(); }

    // agent registration: set document path and verified=false
    public void registerAgent(User user, String documentPath) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(Role.ROLE_AGENT);
        user.setDocumentPath(documentPath);
        user.setVerified(false);
        userRepo.save(user);
    }

    public List<User> findPendingAgents() {
        return userRepo.findByRoleAndVerifiedFalse(Role.ROLE_AGENT);
    }

    public void verifyAgent(Long id) {
        User u = userRepo.findById(id).orElseThrow(() -> new RuntimeException("Agent not found"));
        u.setVerified(true);
        userRepo.save(u);
    }
}
