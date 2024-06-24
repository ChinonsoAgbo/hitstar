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
    //return "192.168.53.5";
    //return "localhost";
    return '192.168.178.106';
    //return '192.168.178.87'
    return '192.168.0.121';
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
