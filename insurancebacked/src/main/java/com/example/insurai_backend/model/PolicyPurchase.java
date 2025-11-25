package com.example.insurai_backend.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "policy_purchases")
public class PolicyPurchase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "policy_id")
    private Policy policy;

    private String nomineeName;
    private String nomineeRelation;
    private String nomineePhone;
    private Integer nomineeAge;

    private LocalDate purchaseDate;
    private LocalDate nextPremiumDue;

    private String status;

    public PolicyPurchase() {}

    public PolicyPurchase(Long id, User user, Policy policy, String nomineeName,
                          String nomineeRelation, String nomineePhone, Integer nomineeAge,
                          LocalDate purchaseDate, LocalDate nextPremiumDue, String status) {
        this.id = id;
        this.user = user;
        this.policy = policy;
        this.nomineeName = nomineeName;
        this.nomineeRelation = nomineeRelation;
        this.nomineePhone = nomineePhone;
        this.nomineeAge = nomineeAge;
        this.purchaseDate = purchaseDate;
        this.nextPremiumDue = nextPremiumDue;
        this.status = status;
    }

    // ------------ GETTERS & SETTERS ------------

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public Policy getPolicy() { return policy; }
    public void setPolicy(Policy policy) { this.policy = policy; }

    public String getNomineeName() { return nomineeName; }
    public void setNomineeName(String nomineeName) { this.nomineeName = nomineeName; }

    public String getNomineeRelation() { return nomineeRelation; }
    public void setNomineeRelation(String nomineeRelation) { this.nomineeRelation = nomineeRelation; }

    public String getNomineePhone() { return nomineePhone; }
    public void setNomineePhone(String nomineePhone) { this.nomineePhone = nomineePhone; }

    public Integer getNomineeAge() { return nomineeAge; }
    public void setNomineeAge(Integer nomineeAge) { this.nomineeAge = nomineeAge; }

    public LocalDate getPurchaseDate() { return purchaseDate; }
    public void setPurchaseDate(LocalDate purchaseDate) { this.purchaseDate = purchaseDate; }

    public LocalDate getNextPremiumDue() { return nextPremiumDue; }
    public void setNextPremiumDue(LocalDate nextPremiumDue) { this.nextPremiumDue = nextPremiumDue; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
