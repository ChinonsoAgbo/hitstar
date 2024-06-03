package de.hhn.labsw.hitstar_backend.repository;

import de.hhn.labsw.hitstar_backend.model.Account;
import de.hhn.labsw.hitstar_backend.model.Game;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
class GameRepositoryTest {

    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private AccountRepository accountRepository;

    private Game game;


    @BeforeEach
    void setUp() {
        Account account = new Account("TestAccount", "NotAPassword");
        account = accountRepository.save(account);

        game = new Game(System.currentTimeMillis(), account);
    }

    @Test
    void saveGame() {
        gameRepository.save(game);
        Game savedGame = gameRepository.findById(game.getId()).get();
        assertEquals(game, savedGame);
    }

    @Test
    void getAllGames() {
        Account account1 = new Account("FirstAccount", "NotAPassword");
        accountRepository.save(account1);
        Game game1 = new Game(System.currentTimeMillis(), account1);

        Account account2 = new Account("SecondAccount", "AbsolutlyNotAPassword");
        accountRepository.save(account2);
        Game game2 = new Game(System.currentTimeMillis(), account2);

        gameRepository.save(game1);
        gameRepository.save(game2);
        List<Game> allGames = gameRepository.findAll();
        assertEquals(2, allGames.size());
    }

    void getGameByUsername(){
        //??
    }
    @Test
    void deleteGame(){
        gameRepository.save(game);
        gameRepository.deleteById(game.getId());
        Optional<Game> gameOptional = gameRepository.findById(game.getId());
        assertEquals(Optional.empty(), gameOptional);

    }
    @AfterEach
    void tearDown() {
        gameRepository.deleteAll();
        accountRepository.deleteAll();

        game = null;
    }
}