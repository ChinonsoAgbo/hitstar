package de.hhn.labsw.hitstar_backend.service;

import de.hhn.labsw.hitstar_backend.model.AuthentificationToken;

import java.util.Optional;

public interface AuthentificationTokenService {

    Optional<AuthentificationToken> findByID(Long id);

    AuthentificationToken saveAccount(AuthentificationToken token);

    void deleteToken(Long id);

}
