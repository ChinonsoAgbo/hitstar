import { defineStore } from "pinia";
import { Ref, ref } from "vue";

const sessionID: Ref<string> = ref("");
const infoTextAvailable: Ref<boolean> = ref(false);
const gameCreated: Ref<boolean> = ref(false);

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
    return import.meta.env.VITE_IP_ADRESS;
  }
  function getGameCreated(){
    return gameCreated.value;
  }
  function setGameCreated(created: boolean) {
    gameCreated.value = created;
  }
  function getInfoTextAvailable(){
    return infoTextAvailable.value;
  }
  function setInfoTextAvailable(available: boolean) {
    infoTextAvailable.value = available;
  }
 
  return {
    setSessionID,
    getSessionID,
    createSessionID,
    getIPAddress,
    getGameCreated,
    setGameCreated,
    getInfoTextAvailable,
    setInfoTextAvailable
  };
});
