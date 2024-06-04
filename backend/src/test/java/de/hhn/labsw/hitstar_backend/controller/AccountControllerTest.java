package de.hhn.labsw.hitstar_backend.controller;

import de.hhn.labsw.hitstar_backend.model.Account;
import de.hhn.labsw.hitstar_backend.service.AccountService;
import graphql.language.StringValue;
import net.minidev.json.JSONArray;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MockMvcBuilder;
import org.springframework.test.web.servlet.MockMvcResultHandlersDsl;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
class AccountControllerTest {

    @Mock
    private AccountService accountService;
    private Account account;
    private List<Account> accounts;


    @InjectMocks
    private AccountController accountController;


    private MockMvc mockMvc;



    @BeforeEach
    void setUp() {
        account = new Account("Michael", "754d9ed944dd8a21586efc4ad68e446e64b71c7bfd6a83c5091060827057e255");
        mockMvc = MockMvcBuilders.standaloneSetup(accountController).build();
    }

    @AfterEach
    void tearDown() {
        account = null;
    }



    @Test
    void findAccountById() throws Exception {
        mockMvc.perform(get("/account/1").contentType(MediaType.APPLICATION_JSON).content(String.valueOf(account))).andDo(MockMvcResultHandlers.print());
        verify(accountService).findByID(1L);
    }

    @Test
    void saveAccount() throws Exception {
        mockMvc.perform(post("/account").contentType(MediaType.APPLICATION_JSON).content(String.valueOf(account))).andDo(MockMvcResultHandlers.print());
        verify(accountService.findByID(account.getId()).get());
    }

    @Test
    void deleteAccount() {
    }
}