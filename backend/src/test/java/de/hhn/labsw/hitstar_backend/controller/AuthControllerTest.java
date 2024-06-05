package de.hhn.labsw.hitstar_backend.controller;

import de.hhn.labsw.hitstar_backend.model.Account;
import de.hhn.labsw.hitstar_backend.repository.AccountRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.*;


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
class AuthControllerTest {

    private static final String REQUEST_URL = "http://localhost:8080/api/auth/signup";
    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private AccountRepository accountRepository;

    private Account account;
    private Account invalidUsernameAccount;
    private Account invalidShortPasswordAccount;
    private Account blankAccount;
    private Account validPasswordAccount;
    private Account usernameBlankAccount;
    private Account pwNearlyTooLongAccount;
    private Account pwTooLongAccount;
    private Account usernameNearlyTooLong;
    private Account usernameTooLong;
    private Account usernameisNull;
    private Account passwordIsNull;


    @BeforeEach
    void setUp() {
        account = new Account("Michael", "SuperSecure");
        invalidUsernameAccount = new Account("M", "SuperSecure");
        invalidShortPasswordAccount = new Account("Michael", "1234");
        blankAccount = new Account("", "");
        validPasswordAccount = new Account("Michael", "12345");
        usernameBlankAccount = new Account("", "Password");
        pwNearlyTooLongAccount = new Account("Michael", "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0");
        pwTooLongAccount = new Account("Michael", "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t01");
        usernameNearlyTooLong = new Account("FantastischerUser123", "123456");
        usernameTooLong = new Account("FantastischerUser1234", "123456");
        usernameisNull = new Account(null, "123456");
        passwordIsNull = new Account("Michael", null);
    }

    @AfterEach
    void tearDown() {
        account = null;
        invalidUsernameAccount = null;
        invalidShortPasswordAccount = null;
        accountRepository.deleteAll();
    }

    @Test
    void registerValidAccount() {
        checkValid(account);

    }

    @Test
    void registerValidPasswordFive() {
        checkValid(validPasswordAccount);

    }

    @Test
    void registerValidLong() {
        checkValid(pwNearlyTooLongAccount);
    }

    @Test
    void registerInvalidShortPassword() {
        checkInvalid(invalidShortPasswordAccount);
    }

    @Test
    void registerInvalidLongPassword() {
        checkInvalid(pwTooLongAccount);

    }

    @Test
    void registerInvalidUsernameAccount() {
        checkInvalid(invalidUsernameAccount);
    }


    @Test
    void registerInvalidBothBlank() {
        checkInvalid(blankAccount);
    }

    @Test
    void registerInvalidUsernameIsBlank() {
        checkInvalid(usernameBlankAccount);

    }

    @Test
    void registerValidUserLong() {
        checkValid(usernameNearlyTooLong);
    }

    @Test
    void registerUserTooLong() {
        checkInvalid(usernameTooLong);

    }

    @Test
    void registerUsernameIsNull() {
        checkInvalid(usernameisNull);
    }

    @Test
    void registerPasswordIsNull() {
        checkInvalid(passwordIsNull);
    }


    @Test
    void registerUserAlreadyExists() {
        checkValid(account);
        ResponseEntity<String> responseTwo = restTemplate.postForEntity(REQUEST_URL, account, String.class);
        assertEquals(responseTwo.getStatusCode(), HttpStatus.BAD_REQUEST);
        System.out.println(responseTwo.getBody());
    }


    /**
     * checks whether a false account is recognized as such or whether it is saved anyway,
     * it uses an HTTP request for this purpose
     *
     * @param account the account to be checked
     */
    private void checkInvalid(Account account) {
        ResponseEntity<String> response = restTemplate.postForEntity(REQUEST_URL, account, String.class);
        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
        System.out.println(response);
        assertFalse(accountRepository.findByUsername(account.getUsername()).isPresent());
    }

    /**
     * checks whether a valid account can be saved, it uses an HTTP request to do so
     *
     * @param account the account to be checked
     */
    private void checkValid(Account account) {
        ResponseEntity<String> response = restTemplate.postForEntity(REQUEST_URL, account, String.class);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        System.out.println(response);
        assertTrue(accountRepository.findByUsername(account.getUsername()).isPresent());
    }

}