package de.hhn.labsw.hitstar_backend.controller;

import de.hhn.labsw.hitstar_backend.service.AuthentificationTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/token")
public class AuthentificationTokenController {

    private final AuthentificationTokenService tokenService;

    @Autowired
    public AuthentificationTokenController(AuthentificationTokenService tokenService) {
        this.tokenService = tokenService;
    }

}
