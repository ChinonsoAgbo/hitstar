import {defineStore} from 'pinia';
import {GameStateNew, guessMsg, MQTTMessage, Player} from "../types";
import {computed, onMounted, ref, Ref} from "vue";
import mqtt from "mqtt";
import {gameStartMsg, turnMsg, playPauseMsg, doubtMsg, drawConfirmMsg} from "../types";

export const useGameStore = defineStore('game', () => {

    const activeGameState: Ref<GameStateNew> = ref(-1);
    const players: Ref<Player[]> = ref([] as Player[]);
    const playerIndex: Ref<number> = ref(-1);
    const client = mqtt.connect("ws://localhost:8000/mqtt");

    function setGameState(gameState: GameStateNew) {
        activeGameState.value = gameState;
    }

    function setNextPlayerAsActive() {
        playerIndex.value = (playerIndex.value + 1) % players.value.length;
    }

    const activePlayer = computed(() => players.value[playerIndex.value]);

    function send(message: MQTTMessage) {
        client.publish(message.topic, message.message);
    }

    onMounted(() => {
        client.on("connect", () => {
            client.subscribe("placeholder/controller", { qos: 0 });
        });

        client.on("message", (topic, message) => {
            if (message.gameState === GameStateNew.DRAWCARD) {
                drawCard();
            }
        });
    });

    function startGame() {
        setGameState(GameStateNew.GAMESTART);
        send(gameStartMsg);
    }

    function startTurn() {
        setGameState(GameStateNew.TURNSTART);
        setNextPlayerAsActive();
        animateNewTurn()
        send(turnMsg(activeGameState.value));
    }

    function drawCard() {
        setGameState(GameStateNew.DRAWCARD);
        animateDrawCard();
        // send(drawConfirmMsg);
    }

    function animateDrawCard() {

    }

    function animateNewTurn(player: Player) {

    }

    return {
        currentGameState: activeGameState,
        startGame
    }
});