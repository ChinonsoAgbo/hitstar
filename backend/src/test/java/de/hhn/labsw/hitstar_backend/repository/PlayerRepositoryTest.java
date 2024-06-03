package de.hhn.labsw.hitstar_backend.repository;

import de.hhn.labsw.hitstar_backend.model.Account;
import de.hhn.labsw.hitstar_backend.model.Game;
import de.hhn.labsw.hitstar_backend.model.Player;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
class PlayerRepositoryTest {
    @Autowired
    private PlayerRepository playerRepository;
    @Autowired
    private GameRepository gameRepository;
    @Autowired
    private AccountRepository accountRepository;

    private Player player;
    private Game game;

    @BeforeEach
    void setUp() {
        Account account = new Account("Michael", "fajkhdfkja");
        accountRepository.save(account);
        game = new Game(System.currentTimeMillis(), account);
        gameRepository.save(game);
        player = new Player();
        player.setGame(game);
    }


    @AfterEach
    void tearDown() {
        playerRepository.deleteAll();
        gameRepository.deleteAll();
        accountRepository.deleteAll();
        player = null;
        game = null;

    }

    @Test
    void savePlayer() {
        playerRepository.save(player);
        Player fechtedPlayer = playerRepository.findById(player.getId()).get();
        assertEquals(player, fechtedPlayer);
    }

    @Test
    void getAllPlayers() {
        Player firstPlayer = new Player();
        firstPlayer.setGame(game);
        Player secondPlayer = new Player();
        secondPlayer.setGame(game);
        Player thirdPlayer = new Player();
        thirdPlayer.setGame(game);
        playerRepository.save(firstPlayer);
        playerRepository.save(secondPlayer);
        playerRepository.save(thirdPlayer);
        assertEquals(firstPlayer, playerRepository.findAll().get(0));

    }

    @Test
    void setPlayerAttributes(){
        player.setPlayerName("Michael");
        player.setPlayerRank(1);
        player.setAvatarURL("SomeRandom.URL");

        playerRepository.save(player);
        Player fechtedPlayer = playerRepository.findById(player.getId()).get();
        assertEquals("Michael", fechtedPlayer.getPlayerName());
        assertEquals(1, fechtedPlayer.getPlayerRank());
        assertEquals("SomeRandom.URL", fechtedPlayer.getAvatarURL());

    }
}