package com.example.insurai_backend.service;

import com.example.insurai_backend.model.Role;
import com.example.insurai_backend.model.Status;
import com.example.insurai_backend.model.User;
import com.example.insurai_backend.repository.UserRepository;
import com.example.insurai_backend.security.JwtUtil;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import org.springframework.security.core.context.SecurityContextHolder;

@Service
public class AuthService {

    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final JavaMailSender mailSender;

    public AuthService(UserRepository userRepo,
                       PasswordEncoder passwordEncoder,
                       JwtUtil jwtUtil,
                       JavaMailSender mailSender) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.mailSender = mailSender;
    }

    public void registerUser(User user) {
        user.setRole(Role.ROLE_CUSTOMER);
        user.setStatus(Status.APPROVED);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepo.save(user);
    }

    public void registerAgent(User user, String documentPath) {
        user.setRole(Role.ROLE_AGENT);
        user.setStatus(Status.PENDING);
        user.setDocumentPath(documentPath);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepo.save(user);
    }
    public String login(String email, String password) {
        User u = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        if (!passwordEncoder.matches(password, u.getPassword()))
            throw new RuntimeException("Invalid credentials");

        if (u.getRole() == Role.ROLE_AGENT && u.getStatus() != Status.APPROVED)
            throw new RuntimeException("Agent is not approved yet");

        return jwtUtil.generateToken(u.getEmail(), u.getRole().name());
    }

    public User findByEmail(String email) {
        return userRepo.findByEmail(email).orElse(null);
    }

    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    public List<User> getPendingAgents() {
        return userRepo.findByRoleAndVerifiedFalse(Role.ROLE_AGENT);
    }

    @Transactional
    public void approveAgent(Long id) {
        User u = userRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (u.getRole() != Role.ROLE_AGENT)
            throw new RuntimeException("Cannot approve non-agent users");

        u.setStatus(Status.APPROVED);
        u.setVerified(true);
        userRepo.save(u);

        sendEmail(u.getEmail(), "Agent Approval - InsurAI",
                "Dear " + u.getName() + ",\n\nYour agent registration has been APPROVED.\n\nRegards,\nInsurAI Team");
    }

    @Transactional
    public void rejectAgent(Long id, String reason) {

        User u = userRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (u.getRole() != Role.ROLE_AGENT)
            throw new RuntimeException("Cannot reject non-agent users");

        sendEmail(
                u.getEmail(),
                "Agent Registration Rejected - InsurAI",
                "Dear " + u.getName() + ",\n\n" +
                "We regret to inform you that your agent registration has been rejected.\n\n" +
                "Reason for rejection:\n" + reason + "\n\n" +
                "You may re-apply with correct/valid documents.\n\n" +
                "Regards,\nInsurAI Team"
        );

        userRepo.delete(u);
    }


    private void sendEmail(String to, String subject, String text) {
        try {
            SimpleMailMessage msg = new SimpleMailMessage();
            msg.setTo(to);
            msg.setSubject(subject);
            msg.setText(text);
            mailSender.send(msg);
        } catch (Exception e) {
            System.err.println("Failed to send email: " + e.getMessage());
        }
    }
 // Get currently logged-in user
    public User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    // Update profile
    public User updateProfile(User updated) {
        User current = getCurrentUser();

        current.setName(updated.getName());
        current.setEmail(updated.getEmail());
        current.setDocumentPath(updated.getDocumentPath());

        // If you add phone/address:
        // current.setPhone(updated.getPhone());
        // current.setAddress(updated.getAddress());

        return userRepo.save(current);
    }

    // Change password
    public void changePassword(String newPassword) {
        User current = getCurrentUser();
        current.setPassword(passwordEncoder.encode(newPassword));
        userRepo.save(current);
    }

}
