package de.hhn.labsw.hitstar_backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;


@Entity
@Table(name = "player")
@Data
public class Player {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "playername")
    @NotBlank
    private String playerName;

    @Column(name = "avatarURL")
    @NotBlank
    private String avatarURL;

    @Column(name = "playerRank")
    private int playerRank;

    @ManyToOne
    @JoinColumn(name = "game_id", nullable = false)
    private Game game;



}
