package de.hhn.labsw.hitstar_backend.service;

import de.hhn.labsw.hitstar_backend.model.Game;

import java.util.List;
import java.util.Optional;

public interface GameService {

    List<Game> findAllGames();

    Optional<Game> findGameById(Long id);

    Game saveGame(Game game);

    Game updateGame(Game game);

    void deleteGame(Long id);

}
