
package com.example.insurai_backend.repository;
import com.example.insurai_backend.model.Policy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface PolicyRepository extends JpaRepository<Policy, Long> {
}
