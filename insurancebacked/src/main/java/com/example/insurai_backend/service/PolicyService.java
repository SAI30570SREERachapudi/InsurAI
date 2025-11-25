package com.example.insurai_backend.service;

import com.example.insurai_backend.model.Policy;
import com.example.insurai_backend.repository.PolicyRepository;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class PolicyService {

    private final PolicyRepository policyRepository;

    public PolicyService(PolicyRepository policyRepository) {
        this.policyRepository = policyRepository;
    }
    public Policy createPolicy(Policy policy) {
        return policyRepository.save(policy);
    }

    public Policy updatePolicy(Long id, Policy updatedPolicy) {
        Policy old = policyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Policy not found"));

        old.setPolicyName(updatedPolicy.getPolicyName());
        old.setDescription(updatedPolicy.getDescription());
        old.setPremium(updatedPolicy.getPremium());
        old.setCoverageAmount(updatedPolicy.getCoverageAmount());
        old.setPolicyType(updatedPolicy.getPolicyType());
        old.setTermInYears(updatedPolicy.getTermInYears());
        old.setActive(updatedPolicy.getActive());

        return policyRepository.save(old);
    }
    public void deletePolicy(Long id) {
        policyRepository.deleteById(id);
    }

    public List<Policy> getAllPolicies() {
        return policyRepository.findAll();
    }

    public Policy getPolicy(Long id) {
        return policyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Policy not found"));
    }
}
