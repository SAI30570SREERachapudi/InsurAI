package com.example.insurai_backend.controller;
import com.example.insurai_backend.model.Policy;
import com.example.insurai_backend.service.PolicyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/policies")
@CrossOrigin(origins = "${frontend.origin}",allowCredentials = "true")
public class PolicyController {

    @Autowired private PolicyService policyService;

    @GetMapping
    public List<Policy> getAll() { return policyService.getAll(); }

    @PostMapping
    public Policy create(@RequestBody Policy p) { return policyService.create(p); }
}
