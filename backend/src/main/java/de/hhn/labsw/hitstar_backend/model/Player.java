package de.hhn.labsw.hitstar_backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Table(name = "player")
public class Player {

    @Getter
    @Setter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Getter
    @Setter
    @Column(name="gameurl")
    private String gameUrl;

    @Getter
    @Setter
    @Column(name="creationtime")
    @DateTimeFormat
    private Long creationTime;

    @Getter
    @Setter
    @Column(name="endtime")
    @DateTimeFormat
    private Long endTime;


}
