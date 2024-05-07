import {defineStore} from 'pinia';
import {Card, GameStateNew, MQTTMessage, Player} from "../types";
import {computed, onMounted, ref, Ref} from "vue";
// import mqtt from "mqtt";
// import {gameStartMsg, turnMsg, playPauseMsg, doubtMsg, drawConfirmMsg} from "../types";

export const useGameStore = defineStore('game', () => {

    const players: Ref<Player[]> = ref([] as Player[]);
    const drawPile: Ref<Card[]> = ref([] as Card[]);
    const discardPile: Ref<Card[]> = ref([] as Card[]);

    const currentCard = ref({} as Card);

    const activeGameState: Ref<GameStateNew> = ref(GameStateNew.NOTSTARTED);
    const playerIndex: Ref<number> = ref(-1);
    const activePlayer = computed(() => players.value[playerIndex.value] || { cards: [{}] } as Player);
    // const client = mqtt.connect("ws://localhost:8000/mqtt");

    const guessedCardIndex = ref(5);
    const lastGuessedCardIndex = ref(5);
    const maxCardIndex = ref(10);
    const minCardIndex = ref(1);

    const SONG_DURATION = 10000;

    const ANIMATION_DURATION = 1000;
    const DRAW_CARD_DURATION = 500;
    const DOUBT_INTERVALL_STEP = 1000;
    const DOUBT_INTERVALL_ANNOUNCEMENT = 2000;
    const DOUBT_INTERVALL = DOUBT_INTERVALL_ANNOUNCEMENT + 5 * DOUBT_INTERVALL_STEP;
    const EVALUATION_ANIMATION_DURATION = 3000;
    const SHOW_CARD_DURATION = 5000;
    const TURN_END_DURATION = 1000;
    const doubtCountDown = ref<number>(0);
   
    // const currentCard: Ref<Card> = ref({id: 100, position: guessedCardIndex.value, title: "test", year: 2021, interpreter: "test"})


    onMounted(() => {

        // client.on("connect", () => {
        //     client.subscribe("placeholder/controller", { qos: 0 });
        // });
        //
        // client.on("message", (topic, message) => {
        //     switch (message.gameState) {
        //         case GameStateNew.DRAWCARD:
        //             Actions.drawCard();
        //             break;
        //         case GameStateNew.GUESS:
        //             switch (message.command) {
        //                 case "left":
        //                     break;
        //                 case "right":
        //                     break;
        //                 case "commit":
        //                     break;
        //             }
        //             break;
        //
        //     }
        // });

        document.onkeydown = (e: KeyboardEvent) => {
            switch (e.key) {
                case "n":
                    Helpers.setNextPlayerAsActive();
                    break;
                case "d":
                    if (activeGameState.value === GameStateNew.TURNSTART)
                        Actions.drawCard();
                    break;
                case "ArrowLeft":
                    if (activeGameState.value === GameStateNew.GUESS) 
                        Actions.moveCardLeft();
                    break;
                case "ArrowRight":
                    if (activeGameState.value === GameStateNew.GUESS) 
                        Actions.moveCardRight();
                    break;
                case "Enter":
                    if (activeGameState.value === GameStateNew.GUESS) 
                        Actions.commitGuess();
                    break;
            }
        }

        Actions.startGame();
    });



    const Helpers = {
        setGameState(gameState: GameStateNew) {
            activeGameState.value = gameState;
        },

        setNextPlayerAsActive() {
            playerIndex.value = (playerIndex.value + 1) % players.value.length;
        },

        drawNewRandomCard() {
            let index = Math.floor(Math.random() * drawPile.value.length);
            currentCard.value = drawPile.value[index];
            drawPile.value.splice(index, 1);
            console.log(currentCard.value);
        },

        send(message: MQTTMessage) {
            // client.publish(message.topic, message.message);
        },

        /**
         * @param position the position of the card
         * @returns if the active Player has a card at the given position
         */
        hasCard(position: number) {
            return this.getCard(position) !== undefined;
        },

        /**
         * @param position the position of the card
         * @returns the card at the given position, if there's one, else undefined
         */
        getCard(position: number) {
            return activePlayer?.value.cards.find((c) => c.position === position);
        },

        getMaxMin() {
            maxCardIndex.value = Math.max(...activePlayer?.value.cards.map((c) => c.position));
            minCardIndex.value = Math.min(...activePlayer?.value.cards.map((c) => c.position));

            if (maxCardIndex.value === minCardIndex.value) {
                minCardIndex.value--;
            }
            console.log(maxCardIndex.value, minCardIndex.value);
        },

        makeRoomInTimeLine() {
            if (!Helpers.hasCard(10)) {
                activePlayer?.value.cards
                    .filter(c => c.position >= guessedCardIndex.value)
                    .forEach(c => {c.position++; c.movedUp = true;});
            }
            else if (!Helpers.hasCard(1)) {
                activePlayer?.value.cards
                    .filter(c => c.position <= guessedCardIndex.value)
                    .forEach(c => {c.position--; c.movedDown = true;});
            }
        },

        switchTimeLineCards() {
            if (Helpers.hasCard(guessedCardIndex.value)) {
                for (let card of activePlayer?.value.cards) {

                    if (card.position === guessedCardIndex.value) {
                        card.position = lastGuessedCardIndex.value;
                        break;
                    }
                }
                lastGuessedCardIndex.value = guessedCardIndex.value;
            }
        },

        moveTimeLineCardsBack() {
            activePlayer?.value.cards
                .filter(c => c.movedUp === true)
                .forEach(c => {c.position--; c.movedUp = false;});
            activePlayer?.value.cards
                .filter(c => c.movedDown === true)
                .forEach(c => {c.position++; c.movedDown = false;});
        }
    }



    const Actions = {
        /**
         * Starts a new game. Called by the main device.
         */
        startGame() {
            console.log("ANIMATE GAME START");
            Helpers.setGameState(GameStateNew.ANIMATE_GAMESTART);
            setTimeout(() => {
                console.log("GAME START");
                Helpers.setGameState(GameStateNew.GAMESTART);
                // Helpers.send(gameStartMsg);
                this.startTurn();
            }, ANIMATION_DURATION);
        },

        /**
         * Starts a new turn. Called by the main device.
         */
        startTurn() {
            console.log("ANIMATE TURN START");
            guessedCardIndex.value = 5;
            lastGuessedCardIndex.value = 5;
            Helpers.setNextPlayerAsActive();
            Helpers.setGameState(GameStateNew.ANIMATE_TURNSTART);
            Helpers.drawNewRandomCard();
            setTimeout(() => {
                console.log("TURN START");
                Helpers.setGameState(GameStateNew.TURNSTART);
                // Helpers.send(turnMsg(GameStateNew.TURNSTART));
                // Helpers.send(turnMsg(GameStateNew.DRAWCARD));
            }, ANIMATION_DURATION);
        },

        /**
         * Draws a card. Called by a controller.
         */
        drawCard() {
            console.log("DRAW CARD");
            Helpers.setGameState(GameStateNew.DRAWCARD);
            setTimeout(() => {
                this.listenToSong();
            }, DRAW_CARD_DURATION);
        },

        
        /**
         * Starts the song. Called by the main device.
         */
        listenToSong() {
            console.log("LISTEN TO SONG");
            Helpers.setGameState(GameStateNew.LISTEN);
            setTimeout(() => {
                this.startGuessing();
            }, SONG_DURATION);
        },

        /**
         * Starts the guessing phase. Called by the main device.
         */
        startGuessing() {
            console.log("START GUESSING");
            Helpers.setGameState(GameStateNew.GUESS);
            // Helpers.send(turnMsg(GameStateNew.GUESS));
            Helpers.makeRoomInTimeLine();
            Helpers.getMaxMin();
        },

        /**
         * Moves the card left. Called by a controller.
         */
        moveCardLeft() {
            console.log("MOVE CARD LEFT");
            guessedCardIndex.value = Math.max(minCardIndex.value, guessedCardIndex.value - 1);
            Helpers.switchTimeLineCards();
            // Helpers.send(guessMsg("left", GameStateNew.GUESS));
        },

        /**
         * Moves the card right. Called by a controller.
         */ 
        moveCardRight() {
            console.log("MOVE CARD RIGHT");
            guessedCardIndex.value = Math.min(maxCardIndex.value, guessedCardIndex.value + 1);
            Helpers.switchTimeLineCards();
            // Helpers.send(guessMsg("right", GameStateNew.GUESS));
        },

        /**
         * Commits the guess. Called by a controller.
         */ 
        commitGuess() {
            console.log("COMMIT GUESS");
            activePlayer.value.cards.push({ id: "0", title: "GUESS", year: NaN, interpreter: "GUESS", position: guessedCardIndex.value });
            // Helpers.send(guessMsg("commit", GameStateNew.GUESS));
            Helpers.setGameState(GameStateNew.WAIT_FOR_DOUBT);
            this.startDoubtCountDown();
            setTimeout(() => {
                Helpers.setGameState(GameStateNew.DOUBT);
            }, DOUBT_INTERVALL);
        },

        /**
         * Starts the doubt count down. Called by the main device.
         */
        startDoubtCountDown() {
            setTimeout(() => {
                doubtCountDown.value = 5;
                let countDown = setInterval(() => {
                    doubtCountDown.value--;
                    console.log(doubtCountDown.value);
                    if (doubtCountDown.value <= 0) {
                        clearInterval(countDown);
                        this.animateEvaluation();
                        doubtCountDown.value = 0;
                    } 
                 }, DOUBT_INTERVALL_STEP);
            }, DOUBT_INTERVALL_ANNOUNCEMENT);
        },

        /**
         * Evaluates the guess. Called by the main device.
         */
        animateEvaluation() {
            Helpers.setGameState(GameStateNew.ANIMATE_EVALUATION);
            setTimeout(() => {
                this.evaluateGuess();
            }, EVALUATION_ANIMATION_DURATION)
        },

        evaluateGuess() {
            Helpers.setGameState(GameStateNew.EVALUATION);

            let lowerBound = Number.NEGATIVE_INFINITY;
            let upperBound = Number.POSITIVE_INFINITY;

            if (Helpers.hasCard(guessedCardIndex.value - 1)) {
                lowerBound = Helpers.getCard(guessedCardIndex.value - 1)!.year;
            }

            if (Helpers.hasCard(guessedCardIndex.value + 1)) {
                upperBound = Helpers.getCard(guessedCardIndex.value + 1)!.year;
            }

            // console.log('LOWER BOUND: ', lowerBound, 'UPPER BOUND: ', upperBound);

            activePlayer.value.cards.splice(
                activePlayer.value.cards.indexOf(
                    activePlayer.value.cards.find((c) => c.position === guessedCardIndex.value)!), 1);

            // console.log(currentCard.value.year);

            if (currentCard.value.year >= lowerBound && currentCard.value.year <= upperBound) {
                this.evaluatePositive();
            } else {
                this.evaluateNegative();
            }
        },

        evaluatePositive() {
            console.log('POSITIVE');
            Helpers.setGameState(GameStateNew.ANIMATE_EVALUATION_POSITIVE);
            setTimeout(() => {
                activePlayer.value.cards.push({ ...currentCard.value, position: guessedCardIndex.value });
                Helpers.setGameState(GameStateNew.TURNEND);
                setTimeout(() => {
                    if (!this.checkWinner())
                        this.startTurn();
                }, TURN_END_DURATION)
            }, SHOW_CARD_DURATION);
        },

        evaluateNegative() {
            console.log('NEGATIVE');
            Helpers.setGameState(GameStateNew.ANIMATE_EVALUATION_NEGATIVE);
            setTimeout(() => {
                Helpers.setGameState(GameStateNew.TURNEND);
                Helpers.moveTimeLineCardsBack();
                setTimeout(() => {
                    this.startTurn();
                }, TURN_END_DURATION)
            }, SHOW_CARD_DURATION);
        },

        checkWinner() {
            if (activePlayer.value.cards.length === 10) {
                Helpers.setGameState(GameStateNew.GAMEEND);
                return true;
            }
            return false;
        }
    }



    return {
        activeGameState,
        players,
        activePlayer,
        guessedCardIndex,
        getCard: Helpers.getCard,
        hasCard: Helpers.hasCard,
        doubtCountDown,
        drawPile,
        discardPile,
        currentCard,
        DRAW_CARD_DURATION
    }
});