package de.hhn.labsw.hitstar_backend.repository;


import de.hhn.labsw.hitstar_backend.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {

    Optional<Account> findByUsername(String username);

    Boolean existsByUsername(String username);
}
