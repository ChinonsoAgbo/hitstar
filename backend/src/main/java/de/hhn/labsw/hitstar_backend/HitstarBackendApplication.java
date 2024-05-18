package de.hhn.labsw.hitstar_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.HashSet;


@SpringBootApplication
public class HitstarBackendApplication {

    @RestController
    class HistarController {
        private HashMap<String, HashSet<String>> sessionUsers = new HashMap<>();

        @PostMapping("/session/{sessionId}/user/{user}")
        public String addUserToSession(@PathVariable String sessionId, @PathVariable String user) {

            HashSet<String> users = sessionUsers.get(sessionId);


            if (users == null) {
                users = new HashSet<>();
                sessionUsers.put(sessionId, users);
            }

            users.add(user);

            return user;
        }

        @GetMapping("/session/{sessionId}/user/")
        public HashSet<String> getUsersInSession(@PathVariable String sessionId) {
            return sessionUsers.get(sessionId);
        }
    }

    public static void main(String[] args) {
        SpringApplication.run(HitstarBackendApplication.class, args);

    }


}
