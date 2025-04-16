package com.backend.TagAlong.config;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.backend.TagAlong.security.CustomUserDetailsService;
import com.backend.TagAlong.security.JwtAuthFilter;


@EnableMethodSecurity
@Configuration
@EnableWebSecurity
public class SecurityConfig {

   @Autowired
   private JwtAuthFilter jwtAuthFilter;

   @Autowired
   private CustomUserDetailsService customUserDetailsService;
   
   @Bean
   public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
         http.csrf(csrf -> csrf.disable()) //disable since using jwt instead
         .authorizeHttpRequests(authorizationManagerRequestMatcherRegistry -> 
         authorizationManagerRequestMatcherRegistry
         .requestMatchers("/api/auth/**").permitAll()
         .requestMatchers(HttpMethod.GET, "/api/events/**").permitAll()
         .requestMatchers(HttpMethod.POST, "/api/events/**").authenticated()
         .requestMatchers("/api/events/my-events").authenticated()
         .requestMatchers("/api/events/tagged").authenticated()
         .anyRequest().authenticated()) //secure other endpoints
         .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // Make session stateless
         .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class) // Add JWT filter
         .httpBasic(org.springframework.security.config.Customizer.withDefaults());
         
         http.cors(Customizer.withDefaults());
         return http.build();
   }

   @Bean
   public DaoAuthenticationProvider daoAuthenticationProvider() {
      DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
      provider.setUserDetailsService(customUserDetailsService);
      provider.setPasswordEncoder(passwordEncoder());
      return provider;
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