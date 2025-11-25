package com.example.insurai_backend.service;

import com.example.insurai_backend.model.Policy;
import com.example.insurai_backend.model.PolicyPurchase;
import com.example.insurai_backend.model.User;
import com.example.insurai_backend.repository.PolicyPurchaseRepository;
import com.example.insurai_backend.repository.PolicyRepository;
import com.example.insurai_backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class PolicyPurchaseService {

    private final PolicyPurchaseRepository repo;
    private final PolicyRepository policyRepo;
    private final AuthService authService;

    public PolicyPurchaseService(PolicyPurchaseRepository repo,
                                 PolicyRepository policyRepo,
                                 AuthService authService) {
        this.repo = repo;
        this.policyRepo = policyRepo;
        this.authService = authService;
    }

    public PolicyPurchase createPurchase(Long policyId, PolicyPurchase dto) {

        User user = authService.getCurrentUser();

        Policy policy = policyRepo.findById(policyId)
                .orElseThrow(() -> new RuntimeException("Policy not found"));

        PolicyPurchase purchase = new PolicyPurchase();
        purchase.setUser(user);
        purchase.setPolicy(policy);
        purchase.setNomineeName(dto.getNomineeName());
        purchase.setNomineeRelation(dto.getNomineeRelation());
        purchase.setNomineePhone(dto.getNomineePhone());
        purchase.setNomineeAge(dto.getNomineeAge());
        purchase.setPurchaseDate(LocalDate.now());
        purchase.setNextPremiumDue(LocalDate.now().plusMonths(1));
        purchase.setStatus("ACTIVE");

        return repo.save(purchase);
    }

    public List<PolicyPurchase> getMyPurchases() {
        User user = authService.getCurrentUser();
        return repo.findByUser(user);
    }
}
