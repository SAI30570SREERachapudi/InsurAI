//package com.example.insurai_backend.security;
//
//
//import jakarta.servlet.FilterChain;
//import jakarta.servlet.ServletException;
//import jakarta.servlet.http.*;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.web.filter.OncePerRequestFilter;
//import java.io.IOException;
//import java.util.List;
//
//public class JwtFilter extends OncePerRequestFilter {
//
//    private final JwtUtil jwtUtil;
//
//    public JwtFilter(JwtUtil jwtUtil) {
//        this.jwtUtil = jwtUtil;
//    }
//
//    @Override
//    protected void doFilterInternal(HttpServletRequest request,
//                                    HttpServletResponse response,
//                                    FilterChain filterChain) throws ServletException, IOException {
//
//        String token = null;
//
//        // 1) Check Authorization header
//        String header = request.getHeader("Authorization");
//        if (header != null && header.startsWith("Bearer ")) {
//            token = header.substring(7);
//        }
//
//        // 2) If not present check cookie (HttpOnly)
//        if (token == null) {
//            if (request.getCookies() != null) {
//                for (Cookie c : request.getCookies()) {
//                    if ("jwt".equals(c.getName())) {
//                        token = c.getValue();
//                    }
//                }
//            }
//        }
//
//        if (token != null && jwtUtil.validateJwtToken(token)) {
//            String username = jwtUtil.getUsernameFromToken(token);
//            String role = jwtUtil.getRoleFromToken(token);
//            // Create Authentication with role
//            UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
//                    username,
//                    null,
//                    List.of(new SimpleGrantedAuthority(role))
//            );
//            SecurityContextHolder.getContext().setAuthentication(auth);
//        }
//
//        filterChain.doFilter(request, response);
//    }
//}


package com.example.insurai_backend.security;

import com.example.insurai_backend.model.User;
import com.example.insurai_backend.service.AuthService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class JwtFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final AuthService authService;

    public JwtFilter(JwtUtil jwtUtil, @Lazy AuthService authService) {
        this.jwtUtil = jwtUtil;
        this.authService = authService;
    }

    private String extractTokenFromCookies(HttpServletRequest request) {
        if (request.getCookies() == null) return null;
        for (Cookie c : request.getCookies()) {
            if ("jwt".equals(c.getName())) return c.getValue();
        }
        return null;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        String token = extractTokenFromCookies(request);

        if (token != null && jwtUtil.validateToken(token)) {
            String email = jwtUtil.getUsername(token);
            String role = jwtUtil.getRole(token);

            if (SecurityContextHolder.getContext().getAuthentication() == null) {

                if ("ROLE_AGENT".equals(role)) {
                    User u = authService.findByEmail(email);
                    if (u == null || !u.isVerified()) {
                        filterChain.doFilter(request, response);
                        return;
                    }
                }

                var auth = new UsernamePasswordAuthenticationToken(
                        email,
                        null,
                        List.of(new SimpleGrantedAuthority(role))
                );
                SecurityContextHolder.getContext().setAuthentication(auth);
            }
        }

        filterChain.doFilter(request, response);
    }
}
