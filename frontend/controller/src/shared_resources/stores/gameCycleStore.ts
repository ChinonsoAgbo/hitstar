import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import {GameState} from "../types";

export const useGameCycleStore = defineStore("gameCycle", () => {

    const activeGameState: Ref<GameState> = ref(GameState.NOTSTARTED);

    function setGameState(gameState: GameState) {
        activeGameState.value = gameState;
    }

    return {
        activeGameState,
        setGameState
    }
});
