package de.hhn.labsw.hitstar_backend.service.impl;

import de.hhn.labsw.hitstar_backend.model.Player;
import de.hhn.labsw.hitstar_backend.repository.PlayerRepository;
import de.hhn.labsw.hitstar_backend.service.PlayerService;

import java.util.List;
import java.util.Optional;

public class PlayerServiceImpl implements PlayerService {

    private final PlayerRepository playerRepository;

    public PlayerServiceImpl(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    @Override
    public List<Player> findAllPlayers() {
        return playerRepository.findAll();
    }

    @Override
    public Optional<Player> findPlayerById(Long id) {
        return playerRepository.findById(id);
    }

    @Override
    public Player savePlayer(Player player) {
        return playerRepository.save(player);
    }

    @Override
    public Player updatePlayer(Player player) {
        return playerRepository.save(player);
    }

    @Override
    public void deletePlayer(Long id) {
        playerRepository.deleteById(id);
    }
}
