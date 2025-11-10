package com.example.insurai_backend.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import com.example.insurai_backend.model.Policy;

public interface PolicyRepository extends JpaRepository<Policy, Long> {}
