package com.example.insurai_backend.model;


import jakarta.persistence.*;

@Entity
@Table(name = "policies")
public class Policy {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String policyName;
    private String type;
    private Double premiumAmount;
    private Double coverageAmount;

    public Policy() {}
    // getters/setters here
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id;}
    public String getPolicyName() { return policyName;}
    public void setPolicyName(String policyName) { this.policyName = policyName;}
    public String getType() { return type;}
    public void setType(String type) { this.type = type;}
    public Double getPremiumAmount() { return premiumAmount;}
    public void setPremiumAmount(Double premiumAmount) { this.premiumAmount = premiumAmount;}
    public Double getCoverageAmount() { return coverageAmount;}
    public void setCoverageAmount(Double coverageAmount) { this.coverageAmount = coverageAmount;}
}
