import { defineStore } from "pinia";
import { ref, Ref, computed } from "vue";
import {
  Player,
  GameState,
  Card,
  MQTTMessage,
  playPauseMsg,
  guessMsg,
  drawConfirmMsg,
  doubtMsg,
  lobbyMsg,
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
  const controllerPlayer: Ref<Player> = ref({ cards: [] as Card[] } as Player);
  const PlayerID = uuidv4();
  const players: Ref<Player[]> = ref([] as Player[]);
  const itsTurn = ref(false);
  const isMusicPlaying = ref(false);

  /**
   * Checks if the active Player is the same as the "device-Player"
   * @param playerId is the PlayerID from the Player of this specific controller
   */
  function checkIfItsTurn(playerId: String) {
    if (activePlayer.value.id === playerId) {
      itsTurn.value = true;
    } else itsTurn.value = false;
  }

  onMounted(() => {
    client.on("connect", () => {
      client.subscribe(`${sessionStore.getSessionID()}/main`, { qos: 1 });
    });

    client.on("message", (__, message) => {
      let msg = JSON.parse(message.toString());
      gameCycle.setGameState(msg.gameState);
      switch (msg.gameState) {
        case GameState.GAMESTART:
          players.value = msg.playerOrder;
          controllerPlayer.value = players.value.find(
            (player) => player.id === PlayerID
          )!;
          console.log(controllerPlayer.value);
          break;
        case GameState.TURNSTART:
          activePlayer.value.id = msg.currentPlayer;
          checkIfItsTurn(PlayerID);
          break;
        case GameState.LISTEN && itsTurn:
          isMusicPlaying.value = true;
          break;
        case GameState.TURNEND:
          itsTurn.value = false;
          break;
        case GameState.MATEGUESS:
          activePlayer.value.id = msg.currentPlayer;
          checkIfItsTurn(PlayerID);
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

    /**
     * is used to move the card in a direction
     * @param direction is "left" or "right"
     */
    turn(direction: String) {
      if (
        itsTurn.value &&
        (gameCycle.activeGameState === GameState.GUESS ||
          gameCycle.activeGameState === GameState.MATEGUESS)
      ) {
        if (direction === "left") {
          Actions.turnLeft(gameCycle.activeGameState);
        }
        if (direction === "right") {
          Actions.turnRight(gameCycle.activeGameState);
        }
      }
    },
  };

  const Actions = {
    /**
     * Adds this Controller to the lobby
     */
    addToLobby() {
      Helpers.send(lobbyMsg(`${sessionStore.getSessionID()}`, PlayerID));
    },

    /**
     * Sends the commit-Message
     */
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

    /**
     * Sends the message to turn the card left.
     * @param gamestate can be GUESS or MATEGUESS
     */
    turnLeft(gamestate: GameState) {
      Helpers.send(
        guessMsg(
          sessionStore.getSessionID(),
          "left",
          gamestate,
          PlayerID,
          activePlayer.value.id
        )
      );
    },

    /**
     * Sends the message to turn the card right.
     * @param gamestate can be GUESS or MATEGUESS
     */
    turnRight(gamestate: GameState) {
      Helpers.send(
        guessMsg(
          sessionStore.getSessionID(),
          "right",
          gamestate,
          PlayerID,
          activePlayer.value.id
        )
      );
    },

    /**
     * if the controller is the current Player the drawCard message will be send.
     */
    drawCard() {
      if (itsTurn.value)
        Helpers.send(drawConfirmMsg(sessionStore.getSessionID(), PlayerID));
    },

    /**
     * the doubt message can only be sent if the current player differs from the doubter.
     */
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
      if (itsTurn.value)
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

    getIconUrl() {
      return controllerPlayer.value.iconURL;
    },
    getPlayerName() {
      return controllerPlayer.value.name;
    },
  };
  return {
    isMusicPlaying,
    commit: Helpers.commit,
    makeDoubt: Actions.makeDoubt,
    turn: Helpers.turn,
    changeMusicState: Actions.changeMusicState,
    addToLobby: Actions.addToLobby,
    PlayerID,
    itsTurn,
    getIconUrl: Actions.getIconUrl,
    getPlayerName: Actions.getPlayerName,
  };
});
