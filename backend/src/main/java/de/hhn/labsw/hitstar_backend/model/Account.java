package de.hhn.labsw.hitstar_backend.model;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@Entity
@Table(name = "account",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "username")})
@Data
public class Account {


    public Account(String username, String password) {
        this.username = username;
        this.password=password;
    }

    public Account() {

    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Size(min = 3, max = 20)
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
