package de.hhn.labsw.hitstar_backend.model;

import jakarta.persistence.*;
import lombok.Data;
import org.jetbrains.annotations.NotNull;
import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Table(name = "player")
@Data
public class Player {

    public Player() {

    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "playername")
    @NotNull
    private String playerName;

    @Column(name = "avatarURL")
    @NotNull
    private String avatarURL;

    @Column(name = "playerRank")
    private int playerRank;



}
