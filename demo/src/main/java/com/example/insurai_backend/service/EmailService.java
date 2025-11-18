package com.example.insurai_backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendAgentApprovalMail(String to, String name) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Agent Approval - InsurAI");
        message.setText("Dear " + (name == null ? "" : name) + ",\n\n"
                + "Congratulations! Your agent registration has been approved by InsurAI admin.\n"
                + "You can now login using your registered credentials.\n\n"
                + "Regards,\nInsurAI Team");
        mailSender.send(message);
    }

    public void sendAgentRejectionMail(String to, String name) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Agent Registration - InsurAI");
        message.setText("Dear " + (name == null ? "" : name) + ",\n\n"
                + "We regret to inform you that your agent registration has been rejected.\n\n"
                + "Regards,\nInsurAI Team");
        mailSender.send(message);
    }
}
