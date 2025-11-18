//package com.example.insurai_backend.security;
//
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.context.annotation.*;
//import org.springframework.http.HttpMethod;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
//import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.http.SessionCreationPolicy;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.web.*;
//import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
//import org.springframework.web.cors.CorsConfiguration;
//import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
//import org.springframework.web.cors.CorsConfigurationSource;
//
//import java.util.List;
//
//@Configuration
//@EnableMethodSecurity
//public class SecurityConfig {
//
//    private final JwtFilter jwtFilter;
//    private final JwtUtil jwtUtil;
//
//    @Value("${frontend.origin:http://localhost:5173}")
//    private String frontendOrigin;
//
//    public SecurityConfig(JwtUtil jwtUtil) {
//        this.jwtUtil = jwtUtil;
//        this.jwtFilter = new JwtFilter(jwtUtil);
//    }
//
//    @Bean
//    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//        http
//            .csrf(csrf -> csrf.disable())
//            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
//            .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
//            .authorizeHttpRequests(auth -> auth
//
//                // Public endpoints (login, register)
//                .requestMatchers("/api/auth/**").permitAll()
//
//                // Example public GET endpoint
//                .requestMatchers(HttpMethod.GET, "/api/policies/**").permitAll()
//
//                // Allow H2 console
//                .requestMatchers("/h2-console/**").permitAll()
//
//                // Role-based access
//                .requestMatchers("/api/admin/**").hasAuthority("ROLE_ADMIN")
//                .requestMatchers("/api/agent/**").hasAuthority("ROLE_AGENT")
//                .requestMatchers("/api/customer/**").hasAuthority("ROLE_CUSTOMER")
//                .requestMatchers("/api/dashboard/admin/**").hasAuthority("ROLE_ADMIN")
//                .requestMatchers("/api/dashboard/agent/**").hasAuthority("ROLE_AGENT")
//                .requestMatchers("/api/dashboard/customer/**").hasAuthority("ROLE_CUSTOMER")
//
//                // Any other route requires authentication
//                .anyRequest().authenticated()
//            );
//
//        // Allow H2 UI to be shown in browser
//        http.headers(headers -> headers.frameOptions(frameOptions -> frameOptions.sameOrigin()));
//
//        // Register JWT filter before the UsernamePasswordAuthenticationFilter
//        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
//
//        return http.build();
//    }
//
//    @Bean
//    public CorsConfigurationSource corsConfigurationSource() {
//        CorsConfiguration config = new CorsConfiguration();
//        config.setAllowedOrigins(List.of(frontendOrigin));
//        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
//        config.setAllowedHeaders(List.of("Authorization", "Content-Type"));
//        config.setAllowCredentials(true);
//        config.setMaxAge(3600L);
//
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", config);
//        return source;
//    }
//
//    @Bean
//    public PasswordEncoder passwordEncoder() {
//        return new BCryptPasswordEncoder();
//    }
//
//    @Bean
//    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
//        return config.getAuthenticationManager();
//    }
//}

package com.example.insurai_backend.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.*;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.*;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.*;

import java.util.List;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    private final JwtFilter jwtFilter;

    public SecurityConfig(@Lazy JwtFilter jwtFilter) {
        this.jwtFilter = jwtFilter;
    }

    @Value("${frontend.origin:http://localhost:5173}")
    private String frontendOrigin;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth

                // -----------------------------
                // PUBLIC ENDPOINTS
                // -----------------------------
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/uploads/**").permitAll()  // file access
                .requestMatchers("/uploads/**").permitAll()

                // -----------------------------
                // ADMIN ACCESS
                // -----------------------------
                .requestMatchers("/api/admin/approve/**").hasAuthority("ROLE_ADMIN")
                .requestMatchers("/api/admin/reject/**").hasAuthority("ROLE_ADMIN")
                .requestMatchers("/api/admin/**").hasAuthority("ROLE_ADMIN")

                // -----------------------------
                // AGENT DASHBOARD
                // -----------------------------
                .requestMatchers("/api/dashboard/agent/**").hasAuthority("ROLE_AGENT")

                // -----------------------------
                // CUSTOMER DASHBOARD
                // -----------------------------
                .requestMatchers("/api/dashboard/customer/**").hasAuthority("ROLE_CUSTOMER")

                // -----------------------------
                // ALL OTHER REQUESTS REQUIRE LOGIN
                // -----------------------------
                .anyRequest().authenticated()
            );

        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        http.headers(headers -> headers.frameOptions(frameOptions -> frameOptions.sameOrigin()));

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of(frontendOrigin));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource src = new UrlBasedCorsConfigurationSource();
        src.registerCorsConfiguration("/**", config);
        return src;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
