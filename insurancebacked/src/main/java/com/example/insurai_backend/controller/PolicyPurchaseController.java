package com.example.insurai_backend.controller;

import com.example.insurai_backend.model.PolicyPurchase;
import com.example.insurai_backend.service.PolicyPurchaseService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/purchases")
public class PolicyPurchaseController {

    private final PolicyPurchaseService service;

    public PolicyPurchaseController(PolicyPurchaseService service) {
        this.service = service;
    }

    // CUSTOMER CAN BUY
    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    @PostMapping("/create/{policyId}")
    public PolicyPurchase createPurchase(@PathVariable Long policyId,
                                         @RequestBody PolicyPurchase dto) {
        return service.createPurchase(policyId, dto);
    }

    // CUSTOMER CAN VIEW THEIR PURCHASES
    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    @GetMapping("/my")
    public List<PolicyPurchase> myPurchases() {
        return service.getMyPurchases();
    }
}
