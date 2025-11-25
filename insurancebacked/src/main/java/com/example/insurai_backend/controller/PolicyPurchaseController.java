package com.example.insurai_backend.controller;

import com.example.insurai_backend.model.PolicyPurchase;
import com.example.insurai_backend.model.Role;
import com.example.insurai_backend.model.User;
import com.example.insurai_backend.service.AuthService;
import com.example.insurai_backend.service.PolicyPurchaseService;

import org.springframework.http.ResponseEntity;
import org.springframework.http.MediaType;
import org.springframework.http.HttpHeaders;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/purchases")
public class PolicyPurchaseController {

    private final PolicyPurchaseService service;
    private final AuthService authService;

    public PolicyPurchaseController(PolicyPurchaseService service, AuthService authService) {
        this.service = service;
        this.authService = authService;
    }

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

    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    @GetMapping("/my")
    public List<PolicyPurchase> myPurchases() {
        return service.getMyPurchases();
    }

    @GetMapping("/receipt/{id}")
    public ResponseEntity<byte[]> downloadReceipt(@PathVariable Long id) {
        PolicyPurchase purchase = service.getById(id);

        User current = authService.getCurrentUser();
        if (!current.getId().equals(purchase.getUser().getId()) &&
                current.getRole() != Role.ROLE_ADMIN) {
            return ResponseEntity.status(403).build();
        }

        try {
            byte[] pdf = service.generateReceiptPdfBytes(purchase);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDispositionFormData("inline", "receipt-" + id + ".pdf");

            return ResponseEntity.ok()
                    .headers(headers)
                    .body(pdf);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }

    @GetMapping("/verify/{id}")
    public ResponseEntity<?> verify(@PathVariable Long id) {
        PolicyPurchase purchase = service.getById(id);

        return ResponseEntity.ok(
                Map.of(
                        "id", purchase.getId(),
                        "policyName", purchase.getPolicy().getPolicyName(),
                        "buyerName", purchase.getUser().getName(),
                        "purchaseDate", purchase.getPurchaseDate(),
                        "status", purchase.getStatus()
                )
        );
    }
}
