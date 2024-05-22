package de.hhn.labsw.hitstar_backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "game")
@Data
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "gameurl")
    @NotBlank
    private String gameUrl;

    @Column(name = "creationtime")
    @NotNull
    @DateTimeFormat
    private Long creationTime;

    @Column(name = "endtime")
    @DateTimeFormat
    private Long endTime;

    @ManyToOne
    @JoinColumn(name = "account_id", nullable = false, updatable = false)
    private Account account;

//    @OneToMany(mappedBy = "game")
//    List<Player> players = new ArrayList<>();
//    TODO: Validierungen
//     3-8 Spieler pro Game (nur auf Client-Seite ausreichend?)
//     Korrekte avatarURL gesendet?
//     GameURL wird vom Server generiert. Validierung der GameURL bei Anfragen (nur Für GameController und PlayerController relevant)!


}
