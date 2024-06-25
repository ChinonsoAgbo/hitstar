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

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Size(min = 3, max = 20, message = "Username must have 3 to 20 characters")
    @Column(name = "username")
    @NotBlank(message = "Username may not be empty or blank.")
    private String username;

    @Column(name = "password")
    //@Size(min = 5, max = 50, message = "Password must have 5 to 50 characters")
    @NotBlank(message = "Username may not be empty or blank.")
    private String password;

    public Account(String username, String password) {
        this.username = username;
        this.password=password;
    }

    public Account() {

    }

    /*@OneToMany(mappedBy = "account")
    List<Game> games = new ArrayList<>();*/
}
