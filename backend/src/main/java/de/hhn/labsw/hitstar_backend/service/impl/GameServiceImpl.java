package de.hhn.labsw.hitstar_backend.service.impl;

import de.hhn.labsw.hitstar_backend.model.Game;
import de.hhn.labsw.hitstar_backend.repository.GameRepository;
import de.hhn.labsw.hitstar_backend.service.GameService;

import java.util.List;
import java.util.Optional;

public class GameServiceImpl implements GameService {

    private final GameRepository gameRepository;

    public GameServiceImpl(GameRepository gameRepository) {
        this.gameRepository = gameRepository;
    }

    @Override
    public List<Game> findAllGames() {
        return gameRepository.findAll();
    }

    @Override
    public Optional<Game> findGameById(Long id) {
        return gameRepository.findById(id);
    }

    @Override
    public Game saveGame(Game game) {
        return gameRepository.save(game);
    }

    @Override
    public Game updateGame(Game game) {
        return gameRepository.save(game);
    }

    @Override
    public void deleteGame(Long id) {
        gameRepository.deleteById(id);
    }
}
