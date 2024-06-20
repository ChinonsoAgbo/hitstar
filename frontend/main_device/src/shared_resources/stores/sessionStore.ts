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
    //return "192.168.53.5";
    //return "localhost";
    return import.meta.env.VITE_IP_ADRESS;
  }
 
  return {
    setSessionID,
    getSessionID,
    createSessionID,
    getIPAddress,
  };
});
