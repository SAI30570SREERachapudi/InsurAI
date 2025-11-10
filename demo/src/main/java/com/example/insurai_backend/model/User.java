package com.example.insurai_backend.model;
import jakarta.persistence.*;

import java.util.Set;
//
//@Entity
//@Table(name = "users")
//public class User {
//    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    private String name;
//
//    @Column(unique = true)
//    private String email;
//
//    private String password;
//
//    // Comma separated roles or a simple String role for demo (ROLE_ADMIN / ROLE_USER)
//    private String role;
//
//    // getters & setters
//
//    public User() {}
//
//    public User(String name, String email, String password, String role) {
//        this.name = name; this.email = email; this.password = password; this.role = role;
//    }
//
//    // getters and setters omitted for brevity - generate them or use Lombok
//    public Long getId() { return id; }
//    public void setId(Long id) { this.id = id; }
//    public String getName() { return name; }
//    public void setName(String name) { this.name = name; }
//    public String getEmail() { return email; }
//    public void setEmail(String email) { this.email = email; }
//    public String getPassword() { return password; }
//    public void setPassword(String password) { this.password = password; }
//    public String getRole() { return role; }
//    public void setRole(String role) { this.role = role; }
//}


@Entity
@Table(name = "users")
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true)
    private String email;

    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    private boolean verified = false; // agent verification

    private String documentPath; // stored file path for agent documents

    // getters & setters
    public User() {}
    public User(String name, String email, String password, Role role) {
        this.name = name; this.email = email; this.password = password; this.role = role;
    }
    public Long getId() { return id; }
    public String getName(){ return name; }
    public void setName(String name){ this.name = name; }
    public String getEmail(){ return email; }
    public void setEmail(String email){ this.email = email; }
    public String getPassword(){ return password; }
    public void setPassword(String password){ this.password = password; }
    public Role getRole(){ return role; }
    public void setRole(Role role){ this.role = role; }
    public boolean isVerified(){ return verified; }
    public void setVerified(boolean verified){ this.verified = verified; }
    public String getDocumentPath(){ return documentPath; }
    public void setDocumentPath(String documentPath){ this.documentPath = documentPath; }
}
