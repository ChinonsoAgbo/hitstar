package de.hhn.labsw.hitstar_backend.repository;

import de.hhn.labsw.hitstar_backend.model.AuthentificationToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthentificationTokenRepository extends JpaRepository<AuthentificationToken, Long> {
}
