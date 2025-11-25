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
//	            .authorizeHttpRequests(auth -> auth
//	                .requestMatchers("/api/auth/**").permitAll()
//            		.requestMatchers("/api/auth/login", "/api/auth/register").permitAll()
//
//	                .requestMatchers(HttpMethod.GET, "/uploads/**").permitAll() 
//	                .requestMatchers("/uploads/**").permitAll()
//	                .requestMatchers("/api/admin/approve/**").hasAuthority("ROLE_ADMIN")
//	                .requestMatchers("/api/admin/reject/**").hasAuthority("ROLE_ADMIN")
//	                .requestMatchers("/api/admin/**").hasAuthority("ROLE_ADMIN")
//	                .requestMatchers("/api/dashboard/agent/**").hasAuthority("ROLE_AGENT")
//	                .requestMatchers("/api/dashboard/customer/**").hasAuthority("ROLE_CUSTOMER")
//	                .requestMatchers("/api/auth/me").authenticated()
//	                .requestMatchers("/api/auth/update").authenticated()
//	
//	
//	                .anyRequest().authenticated()
//	            );
	            .authorizeHttpRequests(auth -> auth
	            	    // Only login + register are public
	            	    .requestMatchers("/api/auth/login", "/api/auth/register").permitAll()
	            	    .requestMatchers(HttpMethod.GET, "/uploads/**").permitAll()
	            	    .requestMatchers("/api/admin/**").hasRole("ADMIN")
		                .requestMatchers("/api/admin/**").hasAuthority("ROLE_ADMIN")
	            	    .requestMatchers("/api/dashboard/agent/**").hasRole("AGENT")
	            	    .requestMatchers("/api/dashboard/customer/**").hasRole("CUSTOMER")
	            	    .requestMatchers("/api/auth/**").authenticated()   
	            	    .requestMatchers("/api/purchases/**").authenticated() 
	            	    .anyRequest().authenticated()
	            	);
	
	        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
	
	        http.headers(headers -> headers.frameOptions(frameOptions -> frameOptions.sameOrigin()));
	
	        return http.build();
	    }
	
	    @Bean
	    public CorsConfigurationSource corsConfigurationSource() {
	        CorsConfiguration config = new CorsConfiguration();
//	        config.setAllowedOrigins(List.of(frontendOrigin));
//	        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
//	        config.setAllowedHeaders(List.of("*"));
//	        config.setAllowCredentials(true);        
	        config.setAllowCredentials(true);
	        config.setAllowedOrigins(List.of(frontendOrigin));
	        config.setAllowedHeaders(List.of("*"));
	        config.setAllowedMethods(List.of("*"));
	        config.setExposedHeaders(List.of("Set-Cookie")); // ⭐ ADD THIS
	        UrlBasedCorsConfigurationSource src = new UrlBasedCorsConfigurationSource();
	        src.registerCorsConfiguration("/**", config);
	        return src;
	    }
	
	    @Bean
	    public PasswordEncoder passwordEncoder() {
	        return new BCryptPasswordEncoder();
	    }
	}