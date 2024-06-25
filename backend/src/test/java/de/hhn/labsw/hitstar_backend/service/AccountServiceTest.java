package de.hhn.labsw.hitstar_backend.service;

import de.hhn.labsw.hitstar_backend.model.Account;
import de.hhn.labsw.hitstar_backend.repository.AccountRepository;
import de.hhn.labsw.hitstar_backend.service.impl.AccountServiceImpl;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AccountServiceTest {


    @Mock
    private AccountRepository accountRepository;

    @Autowired
    @InjectMocks
    private AccountServiceImpl accountService;

    private Account[] accounts = new Account[10];
    Account account;
    Account invalidUsernameAccount;
    Account invalidPasswordAccount;

    @BeforeEach
    void setUp() {
        accounts = new Account[10];
        account = new Account(1L, "Tim", "SuperSecure");
        invalidUsernameAccount = new Account("B", "SuperSecure");
        invalidPasswordAccount = new Account("Ralf", ".");

    }

    @Test
    void findByID() {


    }

    @Test
    void saveAccount() {
        when(accountRepository.save(any())).thenReturn(account);
        account = accountService.saveAccount(account);
        verify(accountRepository, times(1)).save(account);
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
            when(accountRepository.save(any())).thenReturn(account);
            account = accountService.saveAccount(account);
        }
        for (Account account : accounts) {
            verify(accountRepository, times(1)).save(account);
        }

    }

    @Test
    void deleteAccount() {
        when(accountRepository.save(any())).thenReturn(account);
        account = accountService.saveAccount(account);
        accountService.deleteAccount(account.getId());
        assertFalse(accountService.findByID(account.getId()).isPresent());


    }

    @Test
    void checkPassword() {
        when(accountRepository.save(any())).thenReturn(invalidPasswordAccount);
        invalidPasswordAccount = accountService.saveAccount(invalidPasswordAccount);
        verify(accountRepository, times(1)).save(invalidPasswordAccount);


    }

    @Test
    void checkUsername() {
        when(accountRepository.save(any())).thenReturn(account);
        invalidUsernameAccount = accountService.saveAccount(invalidUsernameAccount);
        assertFalse(accountService.findByID(invalidUsernameAccount.getId()).isPresent());


    }




    @AfterEach
    void tearDown() {
        account = null;
        invalidUsernameAccount = null;
        invalidPasswordAccount = null;
        accounts = null;
    }
}

