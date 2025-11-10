package com.example.insurai_backend.service;

import com.example.insurai_backend.model.Policy;
import com.example.insurai_backend.repository.PolicyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PolicyService {
    @Autowired private PolicyRepository policyRepository;

    public List<Policy> getAll() { return policyRepository.findAll(); }
    public Policy create(Policy p) { return policyRepository.save(p); }
}
