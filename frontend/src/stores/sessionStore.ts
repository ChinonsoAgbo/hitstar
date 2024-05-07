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
    //currently only one game per started server
    sessionID.value = self.crypto.randomUUID();
  }

  return {
    setSessionID,
    getSessionID,
    createSessionID,
  };
});
