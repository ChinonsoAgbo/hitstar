import { defineStore } from "pinia";
import { ref, Ref, computed } from "vue";
import {
  Player,
  GameState,
  MQTTMessage,
  playPauseMsg,
  guessMsg,
  drawConfirmMsg,
  doubtMsg,
  lobbyMsg,
  turnMsg,
} from "@shared/types";
import { onMounted } from "vue";
import mqtt from "mqtt";
import { useSessionStore } from "@shared/stores/sessionStore.ts";
//@ts-ignore
import { v4 as uuidv4 } from "uuid";
import { useGameCycleStore } from "@shared/stores/gameCycleStore.ts";

export const useControllerStore = defineStore("controller", () => {
  const gameCycle = useGameCycleStore();
  const sessionStore = useSessionStore();
  const client = mqtt.connect(`ws://${sessionStore.getIPAddress()}:9001`);

  const playerIndex: Ref<number> = ref(-1);
  const activePlayer = computed(
    () => players.value[playerIndex.value] || ({ cards: [{}] } as Player)
  );
  const PlayerID = uuidv4();
  const players: Ref<Player[]> = ref([] as Player[]);
  const itsTurn = ref(false);
  const isMusicPlaying = ref(false);

  onMounted(() => {
    client.on("connect", () => {
      client.subscribe(`${sessionStore.getSessionID()}/main`, { qos: 1 });
    });

    client.on("message", (__, message) => {
      let msg = JSON.parse(message);
      gameCycle.setGameState(msg.gameState);
      switch (msg.gameState) {
        case GameState.GAMESTART:
          players.value = msg.playerOrder;
          break;
        case GameState.TURNSTART:
          activePlayer.value.id = msg.currentPlayer;
          if (activePlayer.value.id === PlayerID) {
            itsTurn.value = true;
          } else itsTurn.value = false;
          break;
        case GameState.LISTEN && itsTurn:
          isMusicPlaying.value = true;
          break;
        case GameState.TURNEND:
          itsTurn.value = false;
          break;
      }
    });
  });
  const Helpers = {
    send(message: MQTTMessage) {
      console.log(message);
      client.publish(message.topic, JSON.stringify(message.message));
    },

    commit() {
      switch (gameCycle.activeGameState) {
        case GameState.DRAWCARD:
          Actions.drawCard();
          break;
        case GameState.LISTEN:
          Actions.changeMusicState();
          break;
        case GameState.GUESS:
          Actions.commitGuess();
          break;
        case GameState.MATEGUESS:
          Actions.commitDoubtGuess();
          break;
      }
    },

    left() {
      if (
        (itsTurn.value && gameCycle.activeGameState === GameState.GUESS) ||
        (!itsTurn.value && gameCycle.activeGameState === GameState.MATEGUESS)
      ) {
        Actions.turnLeft();
      }
    },

    right() {
      if (
        (itsTurn.value && gameCycle.activeGameState === GameState.GUESS) ||
        (!itsTurn.value && gameCycle.activeGameState === GameState.MATEGUESS)
      ) {
        Actions.turnRight();
      }
    },
  };

  const Actions = {
    addToLobby() {
      Helpers.send(lobbyMsg(`${sessionStore.getSessionID()}`, PlayerID));
    },
    commitGuess() {
        Helpers.send(
          guessMsg(
            sessionStore.getSessionID(),
            "commit",
            GameState.GUESS,
            PlayerID,
            activePlayer.value.id
          )
        );
    },
    turnLeft() {
      Helpers.send(
        guessMsg(
          sessionStore.getSessionID(),
          "left",
          GameState.GUESS,
          PlayerID,
          activePlayer.value.id
        )
      );
    },
    turnRight() {
      Helpers.send(
        guessMsg(
          sessionStore.getSessionID(),
          "right",
          GameState.GUESS,
          PlayerID,
          activePlayer.value.id
        )
      );
    },
    drawCard() {
      if (itsTurn.value)
        Helpers.send(drawConfirmMsg(sessionStore.getSessionID(), PlayerID));
    },
    makeDoubt() {
      if (
        !itsTurn.value &&
        gameCycle.activeGameState === GameState.WAIT_FOR_DOUBT
      )
        Helpers.send(
          doubtMsg(sessionStore.getSessionID(), PlayerID, activePlayer.value.id)
        );
    },
    commitDoubtGuess() {
      if (!itsTurn.value)
        Helpers.send(
          guessMsg(
            sessionStore.getSessionID(),
            "commit",
            GameState.MATEGUESS,
            PlayerID,
            activePlayer.value.id
          )
        );
    },
    playMusic() {
      Helpers.send(playPauseMsg(sessionStore.getSessionID(), "play", PlayerID));
    },
    stopMusic() {
      Helpers.send(
        playPauseMsg(sessionStore.getSessionID(), "pause", PlayerID)
      );
    },
    changeMusicState() {
      if (itsTurn.value && gameCycle.activeGameState === GameState.LISTEN) {
        if (isMusicPlaying.value) this.playMusic();
        else this.stopMusic();
      }
    },
  };
  return {
    isMusicPlaying,
    commit: Helpers.commit,
    makeDoubt: Actions.makeDoubt,
    turnRight: Helpers.right,
    turnLeft: Helpers.left,
    changeMusicState: Actions.changeMusicState,
    addToLobby: Actions.addToLobby,
    PlayerID,
    itsTurn,
  };
});
