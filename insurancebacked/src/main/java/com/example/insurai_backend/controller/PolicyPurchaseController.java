package com.example.insurai_backend.controller;

import com.example.insurai_backend.model.PolicyPurchase;
import com.example.insurai_backend.service.PolicyPurchaseService;

import org.springframework.http.ResponseEntity;
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
    @PutMapping("/cancel/{id}")
    public String cancel(@PathVariable Long id) {
        return service.cancelSubscription(id);
    }


    // CUSTOMER CAN VIEW THEIR PURCHASES
    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    @GetMapping("/my")
    public List<PolicyPurchase> myPurchases() {
        return service.getMyPurchases();
    }
    @GetMapping("/receipt/{id}")
    @PreAuthorize("hasAuthority('ROLE_CUSTOMER')")
    public ResponseEntity<byte[]> downloadReceipt(@PathVariable Long id) {

        byte[] pdf = service.generateReceipt(id);

        return ResponseEntity.ok()
                .header("Content-Type", "application/pdf")
                .header("Content-Disposition", "attachment; filename=receipt_" + id + ".pdf")
                .body(pdf);
    }


}