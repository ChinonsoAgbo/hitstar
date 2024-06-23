#!/bin/bash

# Beendet das Skript, wenn ein Befehl fehlschlägt
set -e

# Fragt nach dem Protokoll und der IP-Adresse, welche im nächsten Schritt verwendet wird.
read -p "Bitte geben Sie das Protokoll ein (http oder https, Standard: https): " protocol
read -p "Bitte geben Sie die IP-Adresse ein (für Lokal dieses Format verwenden: 192.168.178.1, Standard: hitstar.ddns.net): " ip_adress
read -p "Möchten Sie das Backend bauen? (für das erste mal unbedingt j, Standard: n): " build_backend

# Setzen Sie die Standardwerte, wenn keine Eingabe erfolgt, sonst werden das eingetragene Protokoll und die IP-Adresse verwendet
ip_adress=${ip_adress:-hitstar.ddns.net}
protocol=${protocol:-https}
build_backend=${build_backend:-n}
# Baut aus den oberen beiden Werten die IP-Adresse mit dem Protokoll zusammen
ip_adress_http="$protocol://$ip_adress"

if [ "$build_backend" = "j" ]; then
    # Docker herunterfahren und aktuell laufende Container löschen
    docker compose down
    # Das Spring-Boot-Projekt in bauen
    cd ../backend
    ./gradlew build -x test 
    docker build --build-arg JAR_FILE=../build/libs/backend-0.0.1-SNAPSHOT.jar -t springio/hitstar_backend .
else
    # Stoppen und entfernen von den Frontend Containern, die nach dem ändern der IP neu gestartet werden sollen
    docker stop web_controller web_main_device
    docker rm web_controller web_main_device
fi

# Pfad zu den .env Dateien
env_file_main_device="../frontend/main_device/.env"
env_file_controller="../frontend/controller/.env"

# Ändert die IP-Adress Varialben in den .env Dateien in den beiden Frontend Projekten
sed -i "s|^VITE_IP_ADRESS_WITH_HTTP=.*$|VITE_IP_ADRESS_WITH_HTTP=$ip_adress_http|" $env_file_main_device
sed -i "s|^VITE_IP_ADRESS_WITH_HTTP=.*$|VITE_IP_ADRESS_WITH_HTTP=$ip_adress_http|" $env_file_controller
sed -i "s/^VITE_IP_ADRESS=.*$/VITE_IP_ADRESS=$ip_adress/" $env_file_main_device
sed -i "s/^VITE_IP_ADRESS=.*$/VITE_IP_ADRESS=$ip_adress/" $env_file_controller

# In das Verzeichnis 'frontend/main_device' wechseln und bauen
cd ../frontend/main_device
npm install
npm run build

# In das Verzeichnis 'controller' wechseln und bauen
cd ../controller
npm install
npm run build 

# Zurück zum Hauptverzeichnis und in das Verzeichnis 'Docker' wechseln
cd ../../Build_Project

# Docker starten
docker compose up -d

echo -e "\nHerzlichen Glückwunsch! Das Projekt wurde vollständig gebaut, bitte überprüfen Sie ggf. in Docker Desktop, ob alle 7 Container nach 10 Sekunden noch laufen."
