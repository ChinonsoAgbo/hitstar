#!/bin/bash

# Hier bite die IP-Adressen gewünschte IP Adresse eintragen
ip_adress="hitstar.ddns.net"
ip_adress_http="https://hitstar.ddns.net"

# Beendet das Skript, wenn ein Befehl fehlschlägt
set -e

# Docker herunterfahren
docker compose down

# Das Spring-Boot-Projekt in builden
#cd ../backend
#./gradlew build -x test 
#docker build --build-arg JAR_FILE=../build/libs/backend-0.0.1-SNAPSHOT.jar -t springio/hitstar_backend .


# Pfad zu den .env Dateien
env_file_main_device="../frontend/main_device/.env"
env_file_controller="../frontend/controller/.env"



# Ändern Sie die Variable in beiden Dateien
sed -i "s|^VITE_IP_ADRESS_WITH_HTTP=.*$|VITE_IP_ADRESS_WITH_HTTP=$ip_adress_http|" $env_file_main_device
sed -i "s|^VITE_IP_ADRESS_WITH_HTTP=.*$|VITE_IP_ADRESS_WITH_HTTP=$ip_adress_http|" $env_file_controller
sed -i "s/^VITE_IP_ADRESS=.*$/VITE_IP_ADRESS=$ip_adress/" $env_file_main_device
sed -i "s/^VITE_IP_ADRESS=.*$/VITE_IP_ADRESS=$ip_adress/" $env_file_controller




# In das Verzeichnis 'frontend/main_device' wechseln und bauen
cd ../frontend/main_device
npm run build

# In das Verzeichnis 'controller' wechseln und bauen
cd ../controller
npm run build 

# Zurück zum Hauptverzeichnis und in das Verzeichnis 'Docker' wechseln
cd ../../Build_Project

# Docker starten
docker compose up -d
