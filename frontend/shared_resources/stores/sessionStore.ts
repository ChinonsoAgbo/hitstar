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
    return "172.23.76.97";

  }
 
  return {
    setSessionID,
    getSessionID,
    createSessionID,
    getIPAddress,
  };
});
