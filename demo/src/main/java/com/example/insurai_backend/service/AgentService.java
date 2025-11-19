package com.example.insurai_backend.service;

import com.example.insurai_backend.model.Role;
import com.example.insurai_backend.model.User;
import com.example.insurai_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AgentService {

    @Autowired private UserRepository userRepository;
    @Autowired private EmailService emailService;

    public List<User> getPendingAgents() {
        return userRepository.findByRoleAndVerifiedFalse(Role.ROLE_AGENT);
    }

    public void approveAgent(Long id) {
        User u = userRepository.findById(id).orElseThrow(() -> new RuntimeException("Agent not found"));
        u.setVerified(true);
        userRepository.save(u);
        try {
            emailService.sendAgentApprovalMail(u.getEmail(), u.getName());
        } catch (Exception ex) {
            System.err.println("Email send failed: " + ex.getMessage());
        }
    }

    public void rejectAgent(Long id) {
        User u = userRepository.findById(id).orElseThrow(() -> new RuntimeException("Agent not found"));
        userRepository.delete(u);
        try {
            emailService.sendAgentRejectionMail(u.getEmail(), u.getName());
        } catch (Exception ex) {
            System.err.println("Email send failed: " + ex.getMessage());
        }
    }
}
