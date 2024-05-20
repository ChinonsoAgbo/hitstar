package de.hhn.labsw.hitstar_backend.service;

import de.hhn.labsw.hitstar_backend.model.Account;

import java.util.Optional;

public interface AccountService {

    Optional<Account> findByID(Long id);
    Account saveAccount(Account account);
    void deleteAccount(Long id);
}
