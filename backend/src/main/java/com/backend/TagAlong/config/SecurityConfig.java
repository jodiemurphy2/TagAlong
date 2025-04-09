package com.backend.TagAlong.config;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.backend.TagAlong.security.JwtAuthFilter;


//@EnableMethodSecurity
@Configuration
@EnableWebSecurity
public class SecurityConfig {

   @Autowired
   private JwtAuthFilter jwtAuthFilter;
   
   @Bean
   public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
         http.csrf(csrf -> csrf.disable()) //disable since using jwt instead
         .authorizeHttpRequests(authorizationManagerRequestMatcherRegistry -> 
         authorizationManagerRequestMatcherRegistry
         .requestMatchers("/api/auth/**").permitAll() //allow authentication endpoints
         .anyRequest().authenticated()) //secure other endpoints
         .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // Make session stateless
         .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class) // Add JWT filter
         .httpBasic(org.springframework.security.config.Customizer.withDefaults());
         http.cors(Customizer.withDefaults());
      return http.build();
   }

   @Bean
   public PasswordEncoder passwordEncoder() {
      return new BCryptPasswordEncoder(); //password hashing
   }
    
}

//This is for OAuth2
   // @Bean
    //SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception{
       // http.csrf(AbstractHttpConfigurer::disable)
       //     .authorizeHttpRequests(authorizeRequests -> authorizeRequests.anyRequest().authenticated())
       //     .formLogin(org.springframework.security.config.Customizer.withDefaults());

     //   return http.build();
    //}