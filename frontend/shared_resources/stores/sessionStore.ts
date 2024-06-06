import { defineStore } from "pinia";
import { Ref, ref } from "vue";

const sessionID: Ref<string> = ref("");

export const useSessionStore = defineStore("session", () => {
  function setSessionID(sessionId: string) {
    sessionID.value = sessionId;
  }

  function getSessionID() {
    return sessionID.value;
  }

  function createSessionID() {
    sessionID.value = self.crypto.randomUUID();
  }
  function getIPAddress() {
<<<<<<< HEAD
    return "CHANGEME";
=======
    return "localhost";
>>>>>>> feature/spotify_playlist_karten
  }
 
  return {
    setSessionID,
    getSessionID,
    createSessionID,
    getIPAddress,
  };
});
