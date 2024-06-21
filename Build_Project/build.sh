#!/bin/bash

# Docker herunterfahren
docker compose down

# Das Spring-Boot-Projekt in builden
cd ../backend
./gradlew build -x test 
docker build --build-arg JAR_FILE=../build/libs/backend-0.0.1-SNAPSHOT.jar -t springio/hitstar_backend .




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
