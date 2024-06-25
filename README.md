# Neue Projektstruktur

## Was ist neu?

### Frontend

#### 1. Zwei Projekte
Es gibt jetzt zwei Vue-Projekte für das Frontend. Beide haben getrennte Screens, Komponenten, etc. Es gibt aber auch
einen Ordner "shared_resources", der Dateien enthält, die beide Projekte nutzen. Wenn ihr Dateien anlegt, die für Controller
und Hauptgerät relevant sind, legt das dann bitte im shared-resources-Ordner ab. Wenn eure Datei nur für ein Projekt
wichtig ist, dann legt sie bitte im Projekt an der jeweiligen Stelle ab.

#### 2. Verbesserte Importe
Es gibt jetzt Import-Shortcuts, um solche Import-Statements zu vermeiden: <br>
<code>import sessionStore from '../../../shared_resources/stores'</code><br>
Das kann man jetzt ersetzen durch folgendes Statement: <code>import sessionStore from '@shared/stores'</code>

Folgende Shortcuts hab ich angelegt:
<ul>
<li>@shared -> zeigt auf den shared_resources-Ordner</li>
<li>@components -> zeigt auf den Komponenten-Ordner des jeweiligen Projekts</li>
<li>@stores -> zeigt auf den Store-Ordner des jeweiligen Projekts</li>
<li>@screens -> zeigt auf den Screens-Ordner des jeweiligen Projekts</li>
<li>@assets -> zeigt auf den Assets-Ordner des jeweiligen Projekts</li>
</ul>

Man kann jetzt eigene Komponenten in einer Zeile importieren. Beispiel: <br>
<code>import { HAvatar, HCard, Tokens, HHitstarCard, HSongCard, HPopOver, HHeading, MusicPlayer } from '@components/';</code><br>
anstatt: <br>
<code>
import HAvatar from '@components/HAvatar.vue';<br>
import HCard from '@components/HCard.vue';<br>
import Tokens from '@components/Tokens.vue';<br>
...
</code>

Immer, wenn ihr neue Komponenten anlegt, registriert sie bitte in der index.ts-Datei im Komponenten-Ordner, damit das auch
für neue Komponenten funktioniert.

#### 3. GameCycleStore
Es gibt jetzt einen GameCycleStore, der für den GameCycle zuständig ist. Alles, was den GameCycle betrifft also bitte darüber
machen. Ich hoffe, ich hab alles getestet, aber wenn noch was falsch ist, verbessert es bitte.

### Backend
Ich hab das Backend um Nginx erweitert, das als File-Server für alle Images fungiert. Damit kommt man jetzt so an alle
Bilder: <code>http://localhost:8081/images/hitstar.jpg</code>. Der Nginx-Server ist einfach ein weiterer Service in
der Docker-Compose-Datei.

# Anleitung zum Neu-Aufsetzen, falls es Probleme gibt.

### Schritt 1: Node-Module entfernen
Entferne den Ordner node_modules, falls er bei dir noch irgendwo vorhanden sein sollte.

### Schritt 2: Package locks entfernen
Entferne die Datei package-lock.json, falls sie bei dir noch irgendwo vorhanden sein sollte.

### Schritt 3: Node Module erneut installieren
Führe <code>npm install</code> im main_device-Ordner aus. Jetzt sollten alle Libraries installiert werden.

### Schritt 4: Node Module erneut installieren
Führe <code>npm install</code> auch im controller-Ordner aus.

### Schritt 5: Docker-Compose starten
Gehe in den backend-Ordner und führe <code>docker compose up</code> aus.

### Schritt 6: Gehe in den controller-Ordner und starte den Server für den Controller
Führe <code>cd controller</code> und dann <code>npm run dev -- --host</code> aus. Jetzt sollte der Vite-Server starten
und aus dem Netzwerk erreichbar sein. Hier ist der Port wichtig!

### Schritt 7: Gehe in den main_device-Ordner und starte den Server für das Hauptgerät
Führe <code>cd ..</code>, <code>cd main_device</code> und dann <code>npm run dev</code> aus. Jetzt sollte der 
Vite-Server für das Hauptgerät starten (der muss ja nicht aus dem Netzwerk erreichbar sein.)
