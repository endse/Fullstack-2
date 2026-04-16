package com.example.jwtdemo.controller;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class TestController {
    
    @GetMapping("/hello")
    public Map<String, String> hello() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        
        Map<String, String> response = new HashMap<>();
        response.put("message", "Hello! You have successfully accessed a protected endpoint!");
        response.put("username", username);
        response.put("status", "authenticated");
        
        return response;
    }
    
    @GetMapping("/public/info")
    public Map<String, String> publicInfo() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "This is a public endpoint - no authentication required");
        response.put("status", "public");
        
        return response;
    }
}
