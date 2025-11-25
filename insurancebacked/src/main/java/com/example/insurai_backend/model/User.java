package com.example.insurai_backend.model;
import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;
    private String name;
    private String password;

    private String phone;     // ⭐ NEW FIELD
    private String address;   // ⭐ NEW FIELD

    @Enumerated(EnumType.STRING)
    private Role role;

    private String documentPath;

    @Enumerated(EnumType.STRING)
    private Status status;

    private boolean verified;
    private String otp;
    private LocalDateTime otpExpiry;


    public User() {}

    public User(String name, String email, String password, Role role) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    // ----------- GETTERS & SETTERS -----------------

    public Long getId() { return id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }

    public boolean isVerified() { return verified; }
    public void setVerified(boolean verified) { this.verified = verified; }

    public String getDocumentPath() { return documentPath; }
    public void setDocumentPath(String documentPath) { this.documentPath = documentPath; }

    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }

    // ⭐ PHONE
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    // ⭐ ADDRESS
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    // ⭐ OTP
    public String getOtp() { return otp; }
    public void setOtp(String otp) { this.otp = otp; }
    public LocalDateTime getOtpExpiry() { return otpExpiry; }
    public void setOtpExpiry(LocalDateTime otpExpiry) { this.otpExpiry = otpExpiry; }
}
