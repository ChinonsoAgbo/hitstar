package de.hhn.labsw.hitstar_backend.service;

import de.hhn.labsw.hitstar_backend.model.Player;

import java.util.List;
import java.util.Optional;

public interface PlayerService {

    Optional<Player> findPlayerById(Long id);

    Player savePlayer(Player player);

    Player updatePlayer(Player player);

    void deletePlayer(Long id);
}
