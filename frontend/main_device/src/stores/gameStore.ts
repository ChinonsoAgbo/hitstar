import { defineStore } from 'pinia';
import { Card, GameState, MQTTMessage, Player } from "@shared/types";
import {computed, onMounted, ref, Ref} from "vue";
import mqtt from "mqtt";
import {gameStartMsg, turnMsg } from "@shared/types";
import { useSessionStore } from "@shared/stores/sessionStore";
import {useGameCycleStore} from "@shared/stores/gameCycleStore.ts";
import { useSpotifyStore } from './spotifyStore';
import { SOUND_URL } from "@shared/urls";
import {watchOnce} from "@vueuse/core";


export const useGameStore = defineStore('game', () => {

    const gameCycleStore = useGameCycleStore();

    const colors = ref(['red', 'green', 'yellow', 'white', 'lime', 'orange', 'pink', 'gray']);

    const players: Ref<Player[]> = ref([
        {
            id: "0",
            name: "Player 1",
            tokens: 3,
            cards: [],
            iconURL: "image1.png",
            color: "red",
            guessedCardIndex: 0,
            lastGuessedCardIndex: 0,
            maxCardIndex: 0,
            minCardIndex: 0,
        },
        {
            id: "1",
            name: "Player 2",
            tokens: 3,
            cards: [],
            iconURL: "image2.png",
            color: "green",
            guessedCardIndex: 0,
            lastGuessedCardIndex: 0,
            maxCardIndex: 0,
            minCardIndex: 0,
        },
        {
            id: "2",
            name: "Player 3",
            tokens: 3,
            cards: [],
            iconURL: "image3.png",
            color: "yellow",
            guessedCardIndex: 0,
            lastGuessedCardIndex: 0,
            maxCardIndex: 0,
            minCardIndex: 0,
        }
    ]);

    const drawPile: Ref<Card[]> = ref([]);

    const discardPile: Ref<Card[]> = ref([] as Card[]);

    const currentCard = ref({} as Card);

    const activePlayer: Ref<Player> = ref({ cards: [] as Card[]} as Player);
    const playerOnTurnIndex: Ref<number> = ref(-1);
    const playerOnTurn = computed(() => players.value[playerOnTurnIndex.value] || { cards: [{}] } as Player);

    var activePlayerCardsCopy: { [playerID: string]: Card[] } = {};
    const sessionStore = useSessionStore()
    const spotifyStore = useSpotifyStore();
    const client = mqtt.connect(`ws://${sessionStore.getIPAddress()}:9001`);

    const SONG_DURATION = 10000; // 10000

    const ANIMATION_DURATION = 1000; // 1000
    const DRAW_CARD_DURATION = 500;
    const DOUBT_INTERVALL_STEP = 1000; // 1000
    const DOUBT_INTERVALL_ANNOUNCEMENT = 2000; // 2000
    // const DOUBT_INTERVALL = DOUBT_INTERVALL_ANNOUNCEMENT + 5 * DOUBT_INTERVALL_STEP;
    const DOUBT_ANIMATION_DURATION = 4000; // 4000
    const EVALUATION_ANIMATION_DURATION = 3000; // 3000
    const SHOW_CARD_DURATION = 5000; // 5000
    const TURN_END_DURATION = 1000;

    const doubtCountDown = ref<number>(0);

    var timeOut: any = {};
    var countDown: any = {};
    async function loadTracks() {
        drawPile.value = await spotifyStore.loadHitstarTracks();
    }

    const cardShuffleSound = new Audio(`${SOUND_URL}card_shuffle.mp3`);
    const flipCardSound = new Audio(`${SOUND_URL}flip_card.mp3`);
    const cardSwipeSound = new Audio(`${SOUND_URL}card_swipe.mp3`);
    const endGameFanfareSound = new Audio(`${SOUND_URL}end_game_fanfare.mp3`);
    // const explosionSound = new Audio(`${SOUND_URL}explosion.mp3`);
    const successSound = new Audio(`${SOUND_URL}success.mp3`);
    const failureSound = new Audio(`${SOUND_URL}failure.mp3`);

    onMounted(() =>{

        loadTracks()

        watchOnce(drawPile, () => {
            for (let player of players.value) {
                player.cards.push(drawPile.value.pop()!)
            }
        });

        client.on("connect", () => {

            client.subscribe(`${sessionStore.getSessionID()}/controller`, { qos: 0 });
        });
       
        client.on("message", (__, message) => {
            console.log(message)
           let msg = JSON.parse(message.toString())
            switch (msg.gameState) {
                case GameState.DRAWCARD:
                    Actions.drawCard();
                    break;
                case GameState.LISTEN:
                   switch(msg.command){
                       case "pause":
                           break;
                       case "play":
                           break;
                   } break;
                case GameState.DOUBT:
                    if(msg.playerId !== activePlayer.value.id) {
                        const doubtPlayer = players.value.find(player => player.id === msg.senderId);
                        if (doubtPlayer?.tokens! > 0) {
                            Actions.startDoubtPhase(doubtPlayer!)
                        }
                    }
                break;
                case GameState.GUESS:
                    switch (msg.command) {
                        case "left":
                           Actions.moveCardLeft();
                            break;
                        case "right":
                           Actions.moveCardRight();
                            break;
                        case "commit":
                           Actions.commitGuess();
                            break;
                   }
                   break;
                   case GameState.MATEGUESS:
                    switch (msg.command) {
                        case "left":
                           Actions.moveCardLeft();
                            break;
                        case "right":
                           Actions.moveCardRight();
                            break;
                        case "commit":
                           Actions.commitGuess();
                            break;}
                    break;
       
            }
        });

        document.onkeydown = (e: KeyboardEvent) => {
            switch (e.key) {
                case "n": // DO NOT USE THIS IN PRODUCTION
                    Helpers.setNextPlayerAsOnTurn();
                    break;
                case "d":
                    if (gameCycleStore.activeGameState === GameState.TURNSTART)
                        Actions.drawCard();
                    break;
                case "ArrowLeft":
                    if (gameCycleStore.activeGameState === GameState.GUESS)
                        Actions.moveCardLeft();
                    else if (gameCycleStore.activeGameState === GameState.MATEGUESS)
                        Actions.moveCardLeft();
                    break;
                case "ArrowRight":
                    if (gameCycleStore.activeGameState === GameState.GUESS)
                        Actions.moveCardRight();
                    else if (gameCycleStore.activeGameState === GameState.MATEGUESS)
                        Actions.moveCardRight();
                    break;
                case "Enter":
                    if (gameCycleStore.activeGameState === GameState.GUESS)
                        Actions.commitGuess();
                    else if (gameCycleStore.activeGameState === GameState.MATEGUESS)
                        Actions.commitGuess();
                    break;
                case "1":
                    if (gameCycleStore.activeGameState === GameState.WAIT_FOR_DOUBT) {
                        if (players.value[0].tokens > 0)
                            Actions.startDoubtPhase(players.value[0]);
                    }
                    break;
                case "2":
                    if (gameCycleStore.activeGameState === GameState.WAIT_FOR_DOUBT) {
                        if (players.value[1].tokens > 0)
                            Actions.startDoubtPhase(players.value[1]);
                    }
                    break;
                case "3":
                    if (gameCycleStore.activeGameState === GameState.WAIT_FOR_DOUBT) {
                        if (players.value[2].tokens > 0)
                            Actions.startDoubtPhase(players.value[2]);
                    }
                    break;
            }
        }
    });

    function startGame(){
        Helpers.initPlayers();
        Actions.startGame();
    }

    const Helpers = {

        initPlayers() {
            for (let player of players.value) {
                //player.cards.push(drawPile.value.pop()!)
                player.guessedCardIndex = 5;
                player.lastGuessedCardIndex = 5;
                player.maxCardIndex = 10;
                player.minCardIndex = 1;
            }
        },

        setPlayerAsActive(player: Player) {
            activePlayer.value = player;
        },

        setNextPlayerAsOnTurn() {
            playerOnTurnIndex.value = (playerOnTurnIndex.value + 1) % players.value.length;
            this.setPlayerAsActive(playerOnTurn.value);
            console.log("setNextPlayerAsOnTurn", playerOnTurnIndex.value);
            console.log(players.value[playerOnTurnIndex.value]);
        },

        drawNewRandomCard() {
            let index = Math.floor(Math.random() * drawPile.value.length);
            currentCard.value = drawPile.value[index];
            drawPile.value.splice(index, 1);
            console.log(currentCard.value);
        },

        send(message: MQTTMessage) {
            client.publish(message.topic, JSON.stringify(message.message), {retain: true});
        },

        /**
         * @param position the position of the card
         * @returns if the active Player has a card at the given position
         */
        hasCard(position: number, player: Player) {
            return this.getCard(position, player) !== undefined;
        },

        /**
         * @param position the position of the card
         * @returns the card at the given position, if there's one, else undefined
         */
        getCard(position: number, player: Player) {
            return player.cards.find((c) => c.position === position);
        },

        getMaxMin() {
            let max = Math.max(...activePlayer.value.cards.map((c) => c.position));
            let min = Math.min(...activePlayer.value.cards.map((c) => c.position));

            if (activePlayer.value.cards.filter((c) => c.position < 6).length === 0) {
                min = 5;
            }

            activePlayer.value.maxCardIndex = max;
            activePlayer.value.minCardIndex = min;

            if (activePlayer.value.maxCardIndex === activePlayer.value.minCardIndex) {
                console.log("MAX AND MIN ARE SAME");
                activePlayer.value.minCardIndex--;
            }
            console.log(activePlayer.value.maxCardIndex, activePlayer.value.minCardIndex);
        },

        saveCopyOfCards() {
            activePlayerCardsCopy[activePlayer.value.id] = JSON.parse(JSON.stringify(activePlayer.value.cards));
        },

        resetTimeLineCards(player: Player) {
            player.cards = activePlayerCardsCopy[player.id];
        },

        makeRoomInTimeLine() {
            if (!Helpers.hasCard(10, activePlayer.value)) {
                activePlayer?.value.cards
                    .filter(c => c.position >= activePlayer.value.guessedCardIndex)
                    .forEach(c => c.position++);
            }
            else if (!Helpers.hasCard(1, activePlayer.value)) {
                activePlayer?.value.cards
                    .filter(c => c.position <= activePlayer.value.guessedCardIndex)
                    .forEach(c => c.position--);
            }
        },

        switchTimeLineCards() {
            if (Helpers.hasCard(activePlayer.value.guessedCardIndex, activePlayer.value)) {
                for (let card of activePlayer?.value.cards) {
                    if (card.position === activePlayer.value.guessedCardIndex) {
                        card.position = activePlayer.value.lastGuessedCardIndex;
                        break;
                    }
                }
                activePlayer.value.lastGuessedCardIndex = activePlayer.value.guessedCardIndex;
            }
        },

        subtractToken(player: Player) {
            if (player.tokens > 0) {
                player.tokens--;
            }
        }
    }



    const Actions = {
        /**
         * Starts a new game. Called by the main device.
         */
        startGame() {
          
            console.log("ANIMATE GAME START");
            gameCycleStore.setGameState(GameState.ANIMATE_GAMESTART);
            setTimeout(() => {
                console.log("GAME START");
                gameCycleStore.setGameState(GameState.GAMESTART);
                Helpers.send(gameStartMsg(sessionStore.getSessionID(), players.value));
                this.startTurn();
            }, ANIMATION_DURATION);
        },

        /**
         * Starts a new turn. Called by the main device.
         */
        startTurn() {
            console.log("ANIMATE TURN START");
            activePlayer.value.guessedCardIndex = 5;
            activePlayer.value.lastGuessedCardIndex = 5;
            Helpers.setNextPlayerAsOnTurn();
            gameCycleStore.setGameState(GameState.ANIMATE_TURNSTART);
            Helpers.drawNewRandomCard();
            cardShuffleSound.play();
            setTimeout(() => {
                console.log("TURN START");
                gameCycleStore.setGameState(GameState.TURNSTART);
                Helpers.send(turnMsg(sessionStore.getSessionID(),GameState.TURNSTART, activePlayer.value.id));
                Helpers.send(turnMsg(sessionStore.getSessionID(),GameState.DRAWCARD, activePlayer.value.id));
            }, ANIMATION_DURATION);
        },

        /**
         * Draws a card. Called by a controller.
         */
        drawCard() {
            console.log("DRAW CARD");
            gameCycleStore.setGameState(GameState.DRAWCARD);
            //Helpers.send(turnMsg(sessionStore.getSessionID(),GameStateNew.DRAWCARD));
            flipCardSound.play()
            setTimeout(() => {
                this.listenToSong();
                Helpers.send(turnMsg(sessionStore.getSessionID(),GameState.LISTEN, activePlayer.value.id))
            }, DRAW_CARD_DURATION);
        },

        
        /**
         * Starts the song. Called by the main device.
         */
        listenToSong() {
            console.log("LISTEN TO SONG");
            gameCycleStore.setGameState(GameState.LISTEN);
            setTimeout(() => {
                this.startGuessing(GameState.GUESS);
            }, SONG_DURATION);
        },

        /**
         * Starts the guessing phase. Called by the main device.
         */
        startGuessing(gameState: GameState) {
            console.log("START GUESSING");
            activePlayer.value.guessedCardIndex = 5;
            gameCycleStore.setGameState(gameState);
            Helpers.send(turnMsg(sessionStore.getSessionID(), gameState, activePlayer.value.id));
            Helpers.saveCopyOfCards();
            Helpers.makeRoomInTimeLine();
            Helpers.getMaxMin();
        },

        /**
         * Moves the card left. Called by a controller.
         */
        moveCardLeft() {
            console.log("MOVE CARD LEFT");
            cardSwipeSound.play();
            activePlayer.value.guessedCardIndex = Math.max(activePlayer.value.minCardIndex, activePlayer.value.guessedCardIndex - 1);
            Helpers.switchTimeLineCards();
        },

        /**
         * Moves the card right. Called by a controller.
         */ 
        moveCardRight() {
            console.log("MOVE CARD RIGHT");
            cardSwipeSound.play();
            activePlayer.value.guessedCardIndex = Math.min(activePlayer.value.maxCardIndex, activePlayer.value.guessedCardIndex + 1);
            Helpers.switchTimeLineCards();

        },

        /**
         * Commits the guess. Called by a controller.
         */ 
        commitGuess() {
            console.log("COMMIT GUESS");
            activePlayer.value.cards.push({ id: "0", title: "GUESS", year: NaN, interpreter: "GUESS", position: activePlayer.value.guessedCardIndex, trackUri: '' });
            // Helpers.send(guessMsg("commit", GameStateNew.GUESS));
            flipCardSound.play();
            if (gameCycleStore.activeGameState === GameState.GUESS) {
                gameCycleStore.setGameState(GameState.WAIT_FOR_DOUBT);
                Helpers.send(turnMsg(sessionStore.getSessionID(), GameState.WAIT_FOR_DOUBT, activePlayer.value.id))
                this.startDoubtCountDown();
            }
            else if (gameCycleStore.activeGameState === GameState.MATEGUESS) {
                console.log("COMMIT MATE GUESS");
                this.animateEvaluation(true);
            }
        },

        /**
         * Starts the doubt count down. Called by the main device.
         */
        startDoubtCountDown() {
            timeOut = setTimeout(() => {
                doubtCountDown.value = 5;
                countDown = setInterval(() => {
                    doubtCountDown.value--;
                    console.log(doubtCountDown.value);
                    if (doubtCountDown.value <= 0) {
                        clearInterval(countDown);
                        this.animateEvaluation(false);
                        doubtCountDown.value = 0;
                    } 
                 }, DOUBT_INTERVALL_STEP);
            }, DOUBT_INTERVALL_ANNOUNCEMENT);
        },

        startDoubtPhase(player: Player) {
            clearTimeout(timeOut);
            clearInterval(countDown);
            doubtCountDown.value = 0;
            Helpers.setPlayerAsActive(player);
            Helpers.subtractToken(player);
            gameCycleStore.setGameState(GameState.DOUBT);
            setTimeout(() => {

                console.log("Player on turn", playerOnTurn.value);
                console.log("Active player", activePlayer.value);

                gameCycleStore.setGameState(GameState.MATEGUESS);
                Actions.startGuessing(GameState.MATEGUESS);
            }, DOUBT_ANIMATION_DURATION);
        },

        /**
         * Evaluates the guess. Called by the main device.
         */
        animateEvaluation(wasDoubt: boolean) {
            gameCycleStore.setGameState(GameState.ANIMATE_EVALUATION);
            setTimeout(() => {
                this.evaluateGuess(wasDoubt);
            }, EVALUATION_ANIMATION_DURATION)
        },

        evaluateGuess(wasDoubt: boolean) {
            gameCycleStore.setGameState(GameState.EVALUATION);

            let lowerBound = Number.NEGATIVE_INFINITY;
            let upperBound = Number.POSITIVE_INFINITY;

            if (Helpers.hasCard(activePlayer.value.guessedCardIndex - 1, activePlayer.value)) {
                lowerBound = Helpers.getCard(activePlayer.value.guessedCardIndex - 1, activePlayer.value)!.year;
            }

            if (Helpers.hasCard(activePlayer.value.guessedCardIndex + 1, activePlayer.value)) {
                upperBound = Helpers.getCard(activePlayer.value.guessedCardIndex + 1, activePlayer.value)!.year;
            }

            // console.log('LOWER BOUND: ', lowerBound, 'UPPER BOUND: ', upperBound);

            activePlayer.value.cards.splice(
                activePlayer.value.cards.indexOf(
                    activePlayer.value.cards.find((c) => c.position === activePlayer.value.guessedCardIndex)!), 1);

            // console.log(currentCard.value.year);

            if (currentCard.value.year >= lowerBound && currentCard.value.year <= upperBound) {
                this.evaluatePositive(wasDoubt);
            } else {
                this.evaluateNegative(wasDoubt);
            }
        },

        evaluatePositive(wasDoubt: boolean) {
            console.log('POSITIVE');
            gameCycleStore.setGameState(GameState.ANIMATE_EVALUATION_POSITIVE);
            setTimeout(() => {
                successSound.play();
            }, 2000);
            setTimeout(() => {
                if (wasDoubt) {
                    Helpers.resetTimeLineCards(playerOnTurn.value);
                }
                // Helpers.resetTimeLineCards(activePlayer.value);
                activePlayer.value.cards.push({ ...currentCard.value, position: activePlayer.value.guessedCardIndex });
                gameCycleStore.setGameState(GameState.TURNEND);
                setTimeout(() => {
                    if (!this.checkWinner())
                        this.startTurn();
                }, TURN_END_DURATION)
            }, SHOW_CARD_DURATION);
        },

        evaluateNegative(wasDoubt: boolean) {
            console.log('NEGATIVE');
            gameCycleStore.setGameState(GameState.ANIMATE_EVALUATION_NEGATIVE);
            setTimeout(() => {
                failureSound.play();
            }, 2000);
            setTimeout(() => {
                gameCycleStore.setGameState(GameState.TURNEND);
                Helpers.resetTimeLineCards(activePlayer.value);
                setTimeout(() => {
                    if (wasDoubt) {
                        Helpers.setPlayerAsActive(playerOnTurn.value);
                        Actions.animateEvaluation(false);
                    }
                    else {
                        this.startTurn();
                    }
                }, TURN_END_DURATION)
            }, SHOW_CARD_DURATION);
        },

        checkWinner() {
            if (activePlayer.value.cards.length === 10) {
                endGameFanfareSound.play();
                gameCycleStore.setGameState(GameState.GAMEEND);
                return true;
            }
            return false;
        }
    }



    return {
        drawPile,
        discardPile,
        players,
        activePlayer,
        playerOnTurn,
        getCard: Helpers.getCard,
        hasCard: Helpers.hasCard,
        doubtCountDown,
        currentCard,
        DRAW_CARD_DURATION,
        SONG_DURATION,
        startGame,
        colors
    }
});