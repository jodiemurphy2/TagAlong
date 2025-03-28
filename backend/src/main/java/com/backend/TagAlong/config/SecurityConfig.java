package com.backend.TagAlong.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;


//@EnableMethodSecurity
@Configuration
@EnableWebSecurity
public class SecurityConfig {

 @Bean
   public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
         http.authorizeHttpRequests(authorizationManagerRequestMatcherRegistry -> 
         authorizationManagerRequestMatcherRegistry.anyRequest().authenticated())
         .httpBasic(org.springframework.security.config.Customizer.withDefaults());
         http.cors(Customizer.withDefaults());
      return http.build();
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