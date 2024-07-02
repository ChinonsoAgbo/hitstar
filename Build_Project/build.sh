#!/bin/bash

# Beendet das Skript, wenn ein Befehl fehlschlägt
set -e

# Funktion, um die lokale IP-Adresse zu ermitteln
get_local_ip() {
    /mnt/c/Windows/System32/ipconfig.exe | grep 'IPv4-Adresse' | sed -n 's/.*: //p'
    #ifconfig | grep 'inet6 ' | grep -v '127.0.0.1' | awk '{print $2}'
}

# Fragt ob das Skript im Dev-Mode gestartet werden soll.
#read -p "Soll das Programm im Entwicklermodus gestartet werden?(zum Out-of-the-Box testen oder builden bitte n wählen (j/n)): " dev_mode

# Erstellt die shared_resources-Verzeichisse in den beiden frontend-Projekten
mkdir -p ../frontend/controller/src/shared_resources
mkdir -p ../frontend/main_device/src/shared_resources
touch ../frontend/controller/src/shared_resources/dummy.txt
touch ../frontend/main_device/src/shared_resources/dummy.txt

# Kopieren der shared_resources in die beiden frontend-Projekte
sharedResources_Source="../frontend/shared_resources"
shared_resources_main_device="../frontend/main_device/src/shared_resources"
shared_resources_controller="../frontend/controller/src/shared_resources"

# Überprüfen Sie, ob die Quellverzeichnisse existieren
if [ ! -d "$sharedResources_Source" ]; then
    echo "Das Verzeichnis $sharedResources_Source existiert nicht. Bitte überprüfen Sie den Pfad."
    exit 1
fi



# Kopieren der gemeinsamen Ressourcen in die beiden Frontend-Projekte
cp -a "$sharedResources_Source"/* "$shared_resources_main_device"
cp -a "$sharedResources_Source"/* "$shared_resources_controller"

# Pfad zu den .env Dateien
env_file_main_device="../frontend/main_device/.env"
env_file_controller="../frontend/controller/.env"

# Überprüfen Sie, ob die .env-Dateien existieren
if [ ! -f "$env_file_main_device" ] || [ ! -f "$env_file_controller" ]; then
    echo "Eine oder beide .env-Dateien existieren nicht. Bitte überprüfen Sie die Pfade."
    exit 1
fi

# Wenn der Entwicklermodus aktiviert ist, werden die Werte der Ip-Adressen auf localhost gesetzt, zudem bleiben die shared Resoures vorhanden.
if [ "$dev_mode" = "j" ]; then
    ip_adress=localhost
    protocol=http
    port=5174
    ip_adress_http="$protocol://$ip_adress"
    sed -i "s|^VITE_IP_ADRESS_WITH_HTTP=.*$|VITE_IP_ADRESS_WITH_HTTP=$ip_adress_http|" $env_file_main_device
    sed -i "s|^VITE_IP_ADRESS_WITH_HTTP=.*$|VITE_IP_ADRESS_WITH_HTTP=$ip_adress_http|" $env_file_controller
    sed -i "s/^VITE_IP_ADRESS=.*$/VITE_IP_ADRESS=$ip_adress/" $env_file_main_device
    sed -i "s/^VITE_IP_ADRESS=.*$/VITE_IP_ADRESS=$ip_adress/" $env_file_controller
    sed -i "s/^VITE_PORT=.*$/VITE_PORT=$port/" $env_file_main_device
    cp -a "$sharedResources_Source"/* "$shared_resources_main_device"
    cp -a "$sharedResources_Source"/* "$shared_resources_controller"

else
    # Setzen Sie die Standardwerte, wenn keine Eingabe erfolgt, sonst werden das eingetragene Protokoll und die IP-Adresse verwendet
    #read -p "Bitte geben Sie das Protokoll ein (http oder https, Standard: https): " protocol
    default_ip=$(get_local_ip)
    echo -e "Ggf. über cmd *ipconifg* vergleichen -> Die von uns ermittelten lokale IP-Adresse lauten:\n$default_ip"
    read -p "Bitte geben Sie die IP-Adresse ein (für Lokal dieses Format verwenden: 192.168.178.1, Standard: hitstar.ddns.net): " ip_adress
    #read -p "Möchten Sie das Backend bauen? (für den ersten durchlauf während des Aufsetzen unbedingt j, Standard: j (j/n)): " build_backend

    ip_adress=${ip_adress:-hitstar.ddns.net}
    protocol=${protocol:-http}
    build_backend=${build_backend:-j}
    port=8082


# Baut aus den oberen beiden Werten die IP-Adresse mit dem Protokoll zusammen
ip_adress_http="$protocol://$ip_adress"

# Ändert die IP-Adress und Port Varialben in den .env Dateien in den beiden Frontend Projekten
sed -i "s|^VITE_IP_ADRESS_WITH_HTTP=.*$|VITE_IP_ADRESS_WITH_HTTP=$ip_adress_http|" $env_file_main_device
sed -i "s|^VITE_IP_ADRESS_WITH_HTTP=.*$|VITE_IP_ADRESS_WITH_HTTP=$ip_adress_http|" $env_file_controller
sed -i "s/^VITE_IP_ADRESS=.*$/VITE_IP_ADRESS=$ip_adress/" $env_file_main_device
sed -i "s/^VITE_IP_ADRESS=.*$/VITE_IP_ADRESS=$ip_adress/" $env_file_controller
sed -i "s/^VITE_PORT=.*$/VITE_PORT=$port/" $env_file_main_device

# Wenn das Backend gebaut werden soll, führen Sie die entsprechenden Befehle aus
if [ "$build_backend" = "j" ]; then
    # Docker herunterfahren und aktuell laufende Container löschen
    docker compose down
    # Das Spring-Boot-Projekt in bauen
    cd ../backend
    ./gradlew build -x test 
    docker build --build-arg JAR_FILE=../build/libs/backend-0.0.1-SNAPSHOT.jar -t springio/hitstar_backend .
else
    # Stoppen und entfernen von den Frontend Containern, die nach dem ändern der IP neu gestartet werden sollen
    container_names=("web_controller" "web_main_device")
    for container in "${container_names[@]}"; do
        if docker ps -a | grep -q "$container"; then
            docker stop "$container"
            docker rm "$container"
        fi
    done
fi

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
rm -r "$shared_resources_main_device"/*
rm -r "$shared_resources_controller"/*
# Docker starten
docker compose up -d

echo -e "\nHerzlichen Glückwunsch! Das Projekt wurde vollständig gebaut, bitte überprüfen Sie ggf. in Docker Desktop,\nob alle 6 Container nach 10 Sekunden noch laufen. Ist das der Fall sollte alles funktioniert haben. \nHistar kann nun typischerweise bzw. abhänigig von den Eingaben unter folgender Adresse aufgerufen werden: http://localhost:8081\nViel spaß beim spielen wünscht das das Hitstar-Entwicklungsteam."

fi