package com.example.insurai_backend.controller;
import com.example.insurai_backend.model.Policy;

import com.example.insurai_backend.service.PolicyService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.example.insurai_backend.model.PolicyType;

@RestController
@RequestMapping("/api/policies")
public class PolicyController {

    private final PolicyService policyService;

    public PolicyController(PolicyService policyService) {
        this.policyService = policyService;
    }
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public Policy createPolicy(@RequestBody Policy policy) {
        return policyService.createPolicy(policy);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public Policy updatePolicy(@PathVariable Long id, @RequestBody Policy policy) {
        return policyService.updatePolicy(id, policy);
    }
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public String deletePolicy(@PathVariable Long id) {
        policyService.deletePolicy(id);
        return "Policy deleted successfully";
    }

    @PreAuthorize("hasAnyRole('ADMIN','AGENT','CUSTOMER')")
    @GetMapping
    public List<Policy> getAllPolicies() {
        return policyService.getAllPolicies();
    }

    @PreAuthorize("hasAnyRole('ADMIN','AGENT','CUSTOMER')")
    @GetMapping("/{id}")
    public Policy getPolicy(@PathVariable Long id) {
        return policyService.getPolicy(id);
    }

    // POLICY TYPES DROPDOWN
    @PreAuthorize("hasAnyRole('ADMIN','AGENT','CUSTOMER')")
    @GetMapping("/types")
    public PolicyType[] getPolicyTypes() {
        return PolicyType.values();
    }
}
