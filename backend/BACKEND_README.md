# Anleitung zur Nutzung von Postgres (Docker) zur Nutzung in pgAdmin und IntelliJ (während Entwicklungszeit)

Aktuell läuft Postgres, um mögliche Doppelbelegungen zu verhindern, auf Port `6543` (also ***nicht*** auf Port 5432).
Die Nutzerdaten sind wie folgt: Username: `postgres` Passwort: `postgres`

# pgAdmin

In pgAdmin muss über einen Rechtsklick auf Servers -> Register _> Server...

- General:
    - Name: nach bedarf
- Connection:
    - Host name/address: `localhost`
    - Port: `6543`
    - Maintenance database: `hitstar_backend`
    - Username: `postgres`
    - (Passwort sobald gefragt wird: `postgres`)

# IntelliJ
In IntelliJ kann über Database (rechts Zylinder) -> `+`(New) -> Data-Source -> PostgreSQL
- Host: `localhost` Port: `6543`
- Authentication: `User & Password`
- User: `postgres`
- Password: `postgres`
- Database: `hitstar_backend`
- URL: diese sollte aus den vorherigen Eingaben automatisch generiert werden



=> Nicht vergessen vor dem Verbinden `docker compose up -(d)` bzw. in IntelliJ ausführen