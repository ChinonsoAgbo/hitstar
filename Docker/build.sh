#!/bin/bash

# Docker herunterfahren
docker compose down

# In das Verzeichnis 'frontend/main_device' wechseln und bauen
cd ../frontend/main_device
npm run build

# In das Verzeichnis 'controller' wechseln und bauen
cd ../controller
npm run build 

# Zurück zum Hauptverzeichnis und in das Verzeichnis 'Docker' wechseln
cd ../../Docker

# Docker starten
docker compose up -d
