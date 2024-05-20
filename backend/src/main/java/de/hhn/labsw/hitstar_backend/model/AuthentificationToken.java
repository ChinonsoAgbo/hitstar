package de.hhn.labsw.hitstar_backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.jetbrains.annotations.NotNull;
import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Table(name = "authentificationtoken")
@Data
public class AuthentificationToken {

    public AuthentificationToken() {

    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "token")
    @NotNull
    private String token;

    @Column(name="expirydate")
    @DateTimeFormat
    @NotNull
    private Long expiryDate;


}
