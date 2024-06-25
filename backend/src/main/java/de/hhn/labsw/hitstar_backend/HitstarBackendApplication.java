package de.hhn.labsw.hitstar_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.HashSet;


@SpringBootApplication
public class HitstarBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(HitstarBackendApplication.class, args);

    }


}
