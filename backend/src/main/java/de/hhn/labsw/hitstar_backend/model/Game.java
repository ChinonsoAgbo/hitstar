package de.hhn.labsw.hitstar_backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.jetbrains.annotations.NotNull;
import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Table(name = "game")
@Data
public class Game {

    public Game() {

    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name="gameurl")
    @NotNull
    private String gameUrl;

    @Column(name="creationtime")
    @NotNull
    @DateTimeFormat
    private Long creationTime;

    @Column(name="endtime")
    @DateTimeFormat
    private Long endTime;



}
