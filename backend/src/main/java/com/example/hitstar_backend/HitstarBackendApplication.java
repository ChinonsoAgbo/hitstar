package com.example.hitstar_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.HashMap;
import java.util.UUID;


@SpringBootApplication
public class HitstarBackendApplication {
    private HashMap<String, String> sessions = new HashMap<>();

    @PostMapping("/session/")
    public String createGameSession(String sessionId) {
        String session = UUID.randomUUID().toString();
        sessions.put(sessionId, session);
        return session;
    }

    @GetMapping("/session/{id}")
    public String getSessionId(@PathVariable String id) {

        return id;
    }


    PostMapping("/user/")
    public String saveUser(String userId){

    }
    public static void main(String[] args) {
        SpringApplication.run(HitstarBackendApplication.class, args);

    }


}
