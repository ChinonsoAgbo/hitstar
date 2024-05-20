package de.hhn.labsw.hitstar_backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "game")
public class Game {

    @Getter
    @Setter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Getter
    @Setter
    @Column(name = "playername")
    private String playerName;

    @Getter
    @Setter
    @Column(name = "avatarURL")
    private String avatarURL;

    @Getter
    @Setter
    @Column(name = "playerRank")
    private int playerRank;


}
