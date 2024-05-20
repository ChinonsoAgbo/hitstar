package de.hhn.labsw.hitstar_backend.service.impl;

import de.hhn.labsw.hitstar_backend.model.Account;
import de.hhn.labsw.hitstar_backend.repository.AccountRepository;
import de.hhn.labsw.hitstar_backend.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AccountServiceImpl implements AccountService {

    private final AccountRepository accountRepository;

    @Autowired
    public AccountServiceImpl(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    @Override
    public Optional<Account> findByID(Long id) {
        return accountRepository.findById(id);
    }


    @Override
    public Account saveAccount(Account account) {
        return accountRepository.save(account);
    }

    @Override
    public void deleteAccount(Long id) {
        accountRepository.deleteById(id);
    }
}
