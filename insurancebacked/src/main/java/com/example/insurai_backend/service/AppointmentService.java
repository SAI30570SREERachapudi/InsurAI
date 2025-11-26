package com.example.insurai_backend.service;

import com.example.insurai_backend.model.*;
import com.example.insurai_backend.repository.AppointmentRepository;
import com.example.insurai_backend.repository.UserRepository;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentService {

    private final AppointmentRepository repo;
    private final AuthService authService;
    private final UserRepository userRepo;
    private final JavaMailSender mailSender;

    public AppointmentService(
            AppointmentRepository repo,
            AuthService authService,
            UserRepository userRepo,
            JavaMailSender mailSender
    ) {
        this.repo = repo;
        this.authService = authService;
        this.userRepo = userRepo;
        this.mailSender = mailSender;
    }

    // CUSTOMER books appointment
    public Appointment bookAppointment(Long agentId, Appointment dto) {

        User customer = authService.getCurrentUser();
        User agent = userRepo.findById(agentId)
                .orElseThrow(() -> new RuntimeException("Agent not found"));

        Appointment appt = new Appointment();
        appt.setCustomer(customer);
        appt.setAgent(agent);
        appt.setDate(dto.getDate());
        appt.setTime(dto.getTime());
        appt.setReason(dto.getReason());
        appt.setStatus(AppointmentStatus.PENDING);

        Appointment saved = repo.save(appt);

        // send mails
        sendEmail(customer.getEmail(),
                "Appointment Booked",
                "Your appointment with agent " + agent.getName() +
                        " is booked for " + appt.getDate() + " at " + appt.getTime());

        sendEmail(agent.getEmail(),
                "New Appointment Assigned",
                "You have a new appointment with customer " + customer.getName() +
                        " on " + appt.getDate() + " at " + appt.getTime());

        return saved;
    }

    // CUSTOMER VIEW
    public List<Appointment> getCustomerAppointments() {
        return repo.findByCustomer(authService.getCurrentUser());
    }

    // AGENT VIEW
    public List<Appointment> getAgentAppointments() {
        return repo.findByAgent(authService.getCurrentUser());
    }

    // AGENT UPDATES STATUS
    public Appointment updateStatus(Long id, AppointmentStatus status) {
        Appointment appt = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment Not found"));

        appt.setStatus(status);
        repo.save(appt);

        sendEmail(appt.getCustomer().getEmail(),
                "Appointment Status Updated",
                "Your appointment status changed to: " + status);

        return appt;
    }

    private void sendEmail(String to, String subject, String text) {
        try {
            SimpleMailMessage msg = new SimpleMailMessage();
            msg.setTo(to);
            msg.setSubject(subject);
            msg.setText(text);
            mailSender.send(msg);
        } catch (Exception e) {
            System.out.println("Email error: " + e.getMessage());
        }
    }
}
