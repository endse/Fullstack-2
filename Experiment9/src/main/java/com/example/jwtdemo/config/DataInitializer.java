package com.example.jwtdemo.config;

import com.example.jwtdemo.model.User;
import com.example.jwtdemo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (!userRepository.existsByUsername("admin")) {
            User admin = new User("admin", passwordEncoder.encode("password"), "ADMIN");
            userRepository.save(admin);
            System.out.println(">>> Seeded user: admin / password");
        }
        if (!userRepository.existsByUsername("user")) {
            User user = new User("user", passwordEncoder.encode("password"), "USER");
            userRepository.save(user);
            System.out.println(">>> Seeded user: user / password");
        }
    }
}
