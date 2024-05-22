package de.hhn.labsw.hitstar_backend.controller;


import de.hhn.labsw.hitstar_backend.model.Game;
import de.hhn.labsw.hitstar_backend.model.Player;
import de.hhn.labsw.hitstar_backend.service.GameService;
import de.hhn.labsw.hitstar_backend.service.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/player")
public class PlayerController {

    private final PlayerService playerService;

    @Autowired
    public PlayerController(PlayerService playerService) {
        this.playerService = playerService;
    }

    @GetMapping("/{id}")
    public Optional<Player> findPlayerById(@PathVariable("id") Long id) {
        return playerService.findPlayerById(id);
    }

    @PostMapping
    public Player savePlayer(@RequestBody Player player) {
        return playerService.savePlayer(player);
    }

    @PutMapping
    public Player updatePlayer (@RequestBody Player player) {
        return playerService.updatePlayer(player);
    }

    @DeleteMapping("/{id}")
    public void deletePlayer(@PathVariable("id") Long id) {
        playerService.deletePlayer(id);
    }
}
