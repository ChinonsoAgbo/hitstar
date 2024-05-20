package de.hhn.labsw.hitstar_backend.service.impl;

import de.hhn.labsw.hitstar_backend.model.AuthentificationToken;
import de.hhn.labsw.hitstar_backend.repository.AuthentificationTokenRepository;
import de.hhn.labsw.hitstar_backend.service.AuthentificationTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthentificationTokenImpl implements AuthentificationTokenService {

    private final AuthentificationTokenRepository tokenRepository;

    @Autowired
    public AuthentificationTokenImpl(AuthentificationTokenRepository repository) {
        this.tokenRepository = repository;
    }

    @Override
    public Optional<AuthentificationToken> findByID(Long id) {
        return tokenRepository.findById(id);
    }

    @Override
    public AuthentificationToken saveAccount(AuthentificationToken token) {
        return tokenRepository.save(token);
    }

    @Override
    public void deleteToken(Long id) {
        tokenRepository.deleteById(id);
    }
}
