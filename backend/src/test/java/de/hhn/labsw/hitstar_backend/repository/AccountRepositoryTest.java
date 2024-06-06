package de.hhn.labsw.hitstar_backend.repository;

import de.hhn.labsw.hitstar_backend.model.Account;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;


@SpringBootTest
class AccountRepositoryTest {

    @Autowired
    private AccountRepository accountRepository;


    private Account account;


    @BeforeEach
    void setUp() {

        account = new Account("TestUser", "NotSecure");



    }

    @AfterEach
    void tearDown() {
        accountRepository.deleteAll();
        account = null;
    }

    @Test
    void saveAccount() {
        accountRepository.save(account);
        Account fechtedAccount = accountRepository.findById(account.getId()).get();
        assertEquals(account, fechtedAccount);
    }

    @Test
    void GetAllAccounts() {
        Account account1 = new Account("Michael", "NotSecure");
        Account account2 = new Account("Simon", "TotallySecure");
        Account account3 = new Account("Chinonso", "SuperSecure");
        accountRepository.save(account1);
        accountRepository.save(account2);
        accountRepository.save(account3);

        List<Account> accounts = accountRepository.findAll();
        assertEquals("Michael", accounts.get(0).getUsername());
    }

    @Test
    void getAccountByUsername() {
        accountRepository.save(account);
        Optional<Account> accountOptional = accountRepository.findByUsername(account.getUsername());
        assertEquals(account, accountOptional.get());
    }

    @Test
    void deleteAccount() {
        Account account = new Account("Michael", "NotSecure");
        accountRepository.save(account);
        accountRepository.deleteById(account.getId());
        Optional<Account> accountOptional = accountRepository.findById(account.getId());
        assertEquals(Optional.empty(), accountOptional);

    }
}