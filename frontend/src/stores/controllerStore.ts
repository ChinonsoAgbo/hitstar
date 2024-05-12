import { defineStore } from "pinia";
import { ref, Ref, computed } from "vue";
import {
  Player,
  GameStateNew,
  MQTTMessage,
  playPauseMsg,
  guessMsg,
  drawConfirmMsg,
  doubtMsg,
} from "../types";
import { onMounted } from "vue";
import mqtt from "mqtt";

export const useControllerStore = defineStore("controller", () => {
  const playerIndex: Ref<number> = ref(-1);
  const activePlayer = computed(
    () => players.value[playerIndex.value] || ({ cards: [{}] } as Player)
  );
  const controllerPlayer: Ref<Player | null> = ref(null);
  const players: Ref<Player[]> = ref([] as Player[]);
  const itsTurn = ref(false);
  const isMusicPlaying = ref(false);
  const activeGameState: Ref<GameStateNew> = ref(GameStateNew.NOTSTARTED);

  const client = mqtt.connect("ws://localhost:9001");

  onMounted(() => {
    client.on("connect", () => {
      client.subscribe("placeholder/main", { qos: 0 });
    });

    client.on("message", (__, message) => {
      let msg = JSON.parse(message);
      Actions.setCurrentState(msg.gameState);
      switch (msg.gameState) {
        case GameStateNew.GAMESTART:
          players.value = msg.playerOrder;
          break;
        case GameStateNew.TURNSTART:
          //if (activePlayer.value.id === controllerPlayer.value.id) {
          itsTurn.value = true;
          // }

         // itsTurn.value = false;
          break;
        case GameStateNew.LISTEN: //&& itsTurn:
          isMusicPlaying.value = true;
          break;
        case GameStateNew.TURNEND:
          itsTurn.value = false;
          break;
      }
    });
  });
  const Helpers = {
    send(message: MQTTMessage) {
      client.publish(message.topic, JSON.stringify(message.message));
    },

    commit() {
      switch (activeGameState.value) {
        case GameStateNew.DRAWCARD:
          Actions.drawCard();
          break;
        case GameStateNew.LISTEN:
          Actions.changeMusicState();
          break;
        case GameStateNew.GUESS:
          Actions.commitGuess();
          break;
        case GameStateNew.MATEGUESS:
          Actions.commitGuess();
          break;
      }
    },

    left() {
      if (activeGameState.value === GameStateNew.GUESS) {
        Actions.turnLeft();
      }
    },

    right() {
      if (activeGameState.value === GameStateNew.GUESS) {
        Actions.turnRight();
      }
    },
  };

  const Actions = {
    setCurrentState(gameState: GameStateNew) {
      activeGameState.value = gameState;
    },
    commitGuess() {
      //if (itsTurn.value)
      Helpers.send(guessMsg("commit", GameStateNew.GUESS));
    },
    turnLeft() {
      if (
        //itsTurn.value &&
        activeGameState.value === GameStateNew.GUESS
      )
        Helpers.send(guessMsg("left", GameStateNew.GUESS));
    },
    turnRight() {
      if (
        //itsTurn.value &&
        activeGameState.value === GameStateNew.GUESS
      )
        Helpers.send(guessMsg("right", GameStateNew.GUESS));
    },
    drawCard() {
      //if (itsTurn.value)
      Helpers.send(drawConfirmMsg);
    },
    makeDoubt() {
      if (
        // !itsTurn.value &&
        activeGameState.value === GameStateNew.WAIT_FOR_DOUBT
      )
        Helpers.send(doubtMsg);
    },
    commitDoubtGuess() {
      //if (itsTurn.value)
      Helpers.send(guessMsg("commit", GameStateNew.MATEGUESS));
    },
    playMusic() {
      Helpers.send(playPauseMsg("play"));
    },
    stopMusic() {
      Helpers.send(playPauseMsg("pause"));
    },
    changeMusicState() {
      if (
        //itsTurn.value &&
        activeGameState.value === GameStateNew.LISTEN
      ) {
        if (isMusicPlaying.value) this.playMusic();
        else this.stopMusic();
      }
    },
  };
  return {
    activeGameState,
    isMusicPlaying,
    commit: Helpers.commit,
    makeDoubt: Actions.makeDoubt,
    turnRight: Helpers.right,
    turnLeft: Helpers.left,
    changeMusicState: Actions.changeMusicState,
  };
});
