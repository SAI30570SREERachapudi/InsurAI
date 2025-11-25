package com.example.insurai_backend.repository;

import com.example.insurai_backend.model.Role;
import com.example.insurai_backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    List<User> findByRoleAndVerifiedFalse(Role role); // <-- ADD THIS

}
