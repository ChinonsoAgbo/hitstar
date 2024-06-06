package de.hhn.labsw.hitstar_backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.hhn.labsw.hitstar_backend.model.Account;
import de.hhn.labsw.hitstar_backend.service.AccountService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@ExtendWith(MockitoExtension.class)
class AccountControllerTest {

    @Mock
    private AccountService accountService;

    private Account account;
    private Account invalidAccount;
    private List<Account> accounts;


    @InjectMocks
    private AccountController accountController;


    private MockMvc mockMvc;



    @BeforeEach
    void setUp() {
        account = new Account("Michael", "MySuperSecurePassword");
        invalidAccount = new Account("", "");
        mockMvc = MockMvcBuilders.standaloneSetup(accountController).build();

    }

    @AfterEach
    void tearDown() {
        account = null;
    }



    @Test
    void findAccountById() throws Exception {
        when(accountService.findByID(any())).thenReturn(Optional.ofNullable(account));
        mockMvc.perform(get("/account/1").contentType(MediaType.APPLICATION_JSON).content(asJsonString(account))).andDo(print());
        verify(accountService, times(1)).findByID(any());
    }

    @Test
    void findInvalidAccount() throws Exception {
        when(accountService.findByID(any())).thenReturn(Optional.ofNullable(account));
        mockMvc.perform(get("/account/1").contentType(MediaType.APPLICATION_JSON).content(asJsonString(account))).andDo(print());
        verify(accountService, times(1)).findByID(any());
    }

    @Test
    void saveAccount() throws Exception {
        when(accountService.saveAccount(any())).thenReturn(account);
        mockMvc.perform(post("/account").contentType(MediaType.APPLICATION_JSON).content(asJsonString(account))).andExpect(status().isOk()).andDo(print());
        verify(accountService, times(1)).saveAccount(any());
    }

    @Test
    void deleteAccount() throws Exception {
        doNothing().when(accountService).deleteAccount(any());
        mockMvc.perform(delete("/account/1").contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk()).andDo(print());
        verify(accountService, times(1)).deleteAccount(any());
    }

    @Test
    void saveInvalidAccount() throws Exception {
        when(accountService.saveAccount(any())).thenThrow(new RuntimeException());
        mockMvc.perform(post("/account").contentType(MediaType.APPLICATION_JSON).content(asJsonString(invalidAccount))).andExpect(status().is4xxClientError()).andDo(print());
        verify(accountService, times(1)).saveAccount(any());
    }

    public static String asJsonString(final Object obj) {
        try {
            final ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}