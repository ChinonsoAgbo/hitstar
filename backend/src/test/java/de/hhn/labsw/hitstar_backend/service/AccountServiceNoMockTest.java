package de.hhn.labsw.hitstar_backend.service;

import de.hhn.labsw.hitstar_backend.HitstarBackendApplication;
import de.hhn.labsw.hitstar_backend.model.Account;
import de.hhn.labsw.hitstar_backend.service.impl.AccountServiceImpl;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(classes = HitstarBackendApplication.class)
public class AccountServiceNoMockTest {




    @Autowired
    private AccountServiceImpl service;

    private Account[] accounts = new Account[10];
    Account account;
    Account invalidUsernameAccount;

    @BeforeEach
    void setUp() {
        accounts = new Account[10];
        account = new Account("Tim", "SuperSecure");
        invalidUsernameAccount = new Account("B", "SuperSecure");
    }

    @Test
    void findByID() {


    }

    @Test
    void saveAccount() {
        account = service.saveAccount(account);
        assertTrue(service.findByID(account.getId()).isPresent());
        assertEquals(account, service.findByID(account.getId()).get());
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
            service.saveAccount(account);
        }
        for (Account account : accounts) {
            assertTrue(service.findByID(account.getId()).isPresent());
            assertEquals(account, service.findByID(account.getId()).get());
        }

    }

    @Test
    void deleteAccount() {
        account = service.saveAccount(account);
        service.deleteAccount(account.getId());
        assertFalse(service.findByID(account.getId()).isPresent());


    }

    @Test
    void checkPassword() {

    }
    @Test
    void  checkUsername(){
        invalidUsernameAccount = service.saveAccount(invalidUsernameAccount);
        assertFalse(service.findByID(invalidUsernameAccount.getId()).isPresent());


    }

    @Test
    void AccountAlreadyExists(){
        account = service.saveAccount(account);
        account = service.saveAccount(account);
    }

    @AfterEach
    void tearDown() {
        for (Account account : accounts) {
            if (account != null && account.getId() != null) {
                service.deleteAccount(account.getId());
            }
        }
    }
}
