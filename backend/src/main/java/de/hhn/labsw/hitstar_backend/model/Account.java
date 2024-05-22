package de.hhn.labsw.hitstar_backend.model;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "account")
@Data
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "username")
    @NotBlank
    private String username;

    @Column(name = "password")
    @NotBlank
    private String password;

    /*@OneToMany(mappedBy = "account")
    List<Game> games = new ArrayList<>();*/

    @OneToMany(mappedBy = "account")
    List<AuthentificationToken> tokens = new ArrayList<>();



}
