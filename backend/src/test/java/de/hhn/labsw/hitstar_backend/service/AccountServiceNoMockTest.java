package de.hhn.labsw.hitstar_backend.service;

import de.hhn.labsw.hitstar_backend.HitstarBackendApplication;
import de.hhn.labsw.hitstar_backend.model.Account;
import de.hhn.labsw.hitstar_backend.service.impl.AccountServiceImpl;
import jakarta.validation.ConstraintViolationException;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(classes = HitstarBackendApplication.class)
public class AccountServiceNoMockTest {


    @Autowired
    private AccountServiceImpl accountService;

    private Account[] accounts = new Account[10];
    Account account;
    Account invalidUsernameAccount;
    Account invalidPasswordAccount;

    @BeforeEach
    void setUp() {
        accounts = new Account[10];
        account = new Account("Tim", "SuperSecure");
        invalidUsernameAccount = new Account("B", "SuperSecure");
        invalidPasswordAccount = new Account("Hitstar", "Bad");
    }

    @Test
    void findByID() {


    }

    @Test
    void saveAccount() {
        account = accountService.saveAccount(account);
        assertTrue(accountService.findByID(account.getId()).isPresent());
        assertEquals(account, accountService.findByID(account.getId()).get());
    }

    @Test
    void saveMultipleAccounts() {
        accounts[0] = new Account("Alice", "totalNotSecure");
        accounts[1] = new Account("Bob", "totalSecure");
        accounts[2] = new Account("Charlie", "totalSecure");
        accounts[3] = new Account("David", "totalSecure");
        accounts[4] = new Account("Eve", "totalSecure");
        accounts[5] = new Account("Fred", "totalSecure");
        accounts[6] = new Account("Gary", "totalSecure");
        accounts[7] = new Account("John", "totalSecure");
        accounts[8] = new Account("Jack", "totalSecure");
        accounts[9] = new Account("Jane", "totalSecure");
        for (Account account : accounts) {
            account = accountService.saveAccount(account);
        }
        for (Account account : accounts) {
            assertTrue(accountService.findByID(account.getId()).isPresent());
            assertEquals(account, accountService.findByID(account.getId()).get());
        }

    }

    @Test
    void deleteAccount() {
        account = accountService.saveAccount(account);
        accountService.deleteAccount(account.getId());
        assertFalse(accountService.findByID(account.getId()).isPresent());


    }

    @Test
    void checkPassword() {
        assertThrows(ConstraintViolationException.class, () ->
                accountService.saveAccount(invalidPasswordAccount));

    }

    @Test
    void checkUsername() {
        assertThrows(ConstraintViolationException.class, () ->
                accountService.saveAccount(invalidUsernameAccount));
    }


    @Test
    void AccountAlreadyExists() {
        account = accountService.saveAccount(account);
        account = accountService.saveAccount(account);
    }

    @AfterEach
    void tearDown() {
        if (account != null && account.getId() != null) {
            accountService.deleteAccount(account.getId());
        }
        if (invalidUsernameAccount != null && invalidUsernameAccount.getId() != null) {
            accountService.deleteAccount(invalidUsernameAccount.getId());
        }
        if (invalidPasswordAccount != null && invalidPasswordAccount.getId() != null) {
            accountService.deleteAccount(invalidPasswordAccount.getId());
        }
        for (Account account : accounts) {
            if (account != null && account.getId() != null) {
                accountService.deleteAccount(account.getId());
            }
        }
    }

}
