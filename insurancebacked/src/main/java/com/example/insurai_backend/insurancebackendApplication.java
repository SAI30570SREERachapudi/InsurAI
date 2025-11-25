package com.example.insurai_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.UserDetailsServiceAutoConfiguration;

@SpringBootApplication(
        exclude = {
                UserDetailsServiceAutoConfiguration.class // ❗ disable in-memory user, KEEP HttpSecurity
        }
)
public class insurancebackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(insurancebackendApplication.class, args);
    }

}
