import { defineStore } from 'pinia';
import { Card, GameState, MQTTMessage, Player } from "@shared/types";
import {computed, onMounted, ref, Ref} from "vue";
import mqtt from "mqtt";
import {gameStartMsg, turnMsg } from "@shared/types";
import { useSessionStore } from "@shared/stores/sessionStore";
import {useGameCycleStore} from "@shared/stores/gameCycleStore.ts";
import { useSpotifyStore } from './spotifyStore';
import { SOUND_URL } from "@shared/urls";
import {router} from "../router";


export const useGameStore = defineStore('game', () => {

    const gameCycleStore = useGameCycleStore();
    const sessionStore = useSessionStore()
    const spotifyStore = useSpotifyStore();
    const client = mqtt.connect(`ws://${sessionStore.getIPAddress()}:9001`);


    const SONG_DURATION = 15000; // 10000

    const ANIMATION_DURATION = 1000; // 1000
    const DRAW_CARD_DURATION = 500;
    const DOUBT_INTERVALL_STEP = 1000; // 1000
    const DOUBT_INTERVALL_STEP_NUM = 3;
    const DOUBT_INTERVALL_ANNOUNCEMENT = 2000; // 2000
    const DOUBT_ANIMATION_DURATION = 4000; // 4000
    // const EVALUATION_ANIMATION_DURATION = 0; // 3000
    const SHOW_CARD_DURATION = 5000; // 5000
    const TURN_END_DURATION = 1000;

    const MAX_CARDS = 5;


    const colors = ['red', 'green', 'yellow', 'white', 'lime', 'orange', 'pink', 'gray'];
    // const nickNames = ['Bananenbrei', 'Carl Gustav', 'Schwitziger Axel', 'Jesus', 'Kai-Uwe', 'Dieter Bohlen', 'Bruce Wayne', 'Pinguin'];


    const players: Ref<Player[]> = ref([
        // {
        //     id: "0",
        //     name: "Player 1",
        //     tokens: 3,
        //     cards: [],
        //     iconURL: "image1.png",
        //     color: "red",
        //     guessedCardIndex: 4,
        // },
        // {
        //     id: "1",
        //     name: "Player 2",
        //     tokens: 3,
        //     cards: [],
        //     iconURL: "image2.png",
        //     color: "green",
        //     guessedCardIndex: 4,
        // },
        // {
        //     id: "2",
        //     name: "Player 3",
        //     tokens: 3,
        //     cards: [],
        //     iconURL: "image3.png",
        //     color: "yellow",
        //     guessedCardIndex: 4,
        // },
        // {
        //     id: "3",
        //     name: "Player 4",
        //     tokens: 3,
        //     cards: [],
        //     iconURL: "image4.png",
        //     color: "white",
        //     guessedCardIndex: 4,
        // },
        // {
        //     id: "4",
        //     name: "Player 5",
        //     tokens: 3,
        //     cards: [],
        //     iconURL: "image5.png",
        //     color: "lime",
        //     guessedCardIndex: 4,
        // },
        // {
        //     id: "5",
        //     name: "Player 6",
        //     tokens: 3,
        //     cards: [],
        //     iconURL: "image6.png",
        //     color: "orange",
        //     guessedCardIndex: 4,
        // },
        // {
        //     id: "6",
        //     name: "Player 7",
        //     tokens: 3,
        //     cards: [],
        //     iconURL: "image7.bmp",
        //     color: "pink",
        //     guessedCardIndex: 4,
        // },
        // {
        //     id: "7",
        //     name: "Player 8",
        //     tokens: 3,
        //     cards: [],
        //     iconURL: "image8.jpg",
        //     color: "gray",
        //     guessedCardIndex: 4,
        // }
    ]);

    const drawPile: Ref<Card[]> = ref([]);
    const discardPile: Ref<Card[]> = ref([] as Card[]);

    const currentCard = ref({} as Card);
    const placeHolderCard = {
        id: '',
        title: '',
        year: 0,
        interpreter: '',
        trackUri: '',
    };
    const hitstarCard = {
        id: "0",
        title: "HITSTAR",
        year: 0,
        interpreter: "HITSTAR",
        trackUri: '',
    };
    // const dummyCard = {
    //     id: "0",
    //     title: "dummy",
    //     year: 0,
    //     interpreter: "dummy",
    //     trackUri: '',
    // }
    const hitstarCards = ref(Array.from({length: MAX_CARDS - 1}, () => placeHolderCard));
    var activePlayerCardsCopy: Card[] = [];

    const activePlayer: Ref<Player> = ref({ cards: [] as Card[]} as Player);
    const playerOnTurnIndex: Ref<number> = ref(-1);
    const playerOnTurn = computed(() => players.value[playerOnTurnIndex.value] || { cards: [{}] } as Player);

    // var activePlayerCardsCopy: { [playerID: string]: Card[] } = {};

    const doubtCountDown = ref<number>(0);

    var timeOut: any = {};
    var countDown: any = {};
    async function loadTracks() {
        drawPile.value = await spotifyStore.loadHitstarTracks();
        // drawPile.value = Array.from({length: 100}, () => dummyCard);
    }

    // ================== SOUNDS ==================
    const newTurnSound = new Audio(`${SOUND_URL}new_turn.mp3`);
    const flipCardSound = new Audio(`${SOUND_URL}flip_card.mp3`);
    const cardSwipeSound = new Audio(`${SOUND_URL}card_swipe.mp3`);
    const fanfareSound = new Audio(`${SOUND_URL}end_game_fanfare.mp3`);
    const popSound = new Audio(`${SOUND_URL}pop.mp3`);
    const successSound = new Audio(`${SOUND_URL}success.mp3`);
    const failureSound = new Audio(`${SOUND_URL}failure.mp3`);
    const swordSound = new Audio(`${SOUND_URL}sword.mp3`);

    onMounted(() =>{

        loadTracks();

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
        Actions.startGame();
        Helpers.initPlayers();
    }

    const Helpers = {

        initPlayers() {
            for (let player of players.value) {
                //player.cards.push(drawPile.value.pop()!)
                player.guessedCardIndex = Math.floor(MAX_CARDS / 2);

                for (let i = 0; i < Math.floor(MAX_CARDS / 2); i++)
                    player.cards.push({
                        id: "",
                        title: "",
                        year: Number.NEGATIVE_INFINITY,
                        interpreter: "",
                        trackUri: '',
                    });

                player.cards.push(drawPile.value.pop()!);

                for (let i = Math.floor(MAX_CARDS / 2) + 1; i < MAX_CARDS; i++)
                    player.cards.push({
                        id: "",
                        title: "",
                        year: Number.POSITIVE_INFINITY,
                        interpreter: "",
                        trackUri: '',
                    });
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

        getYearOfCard(index: number) {
            if (index < 0)
                return Number.NEGATIVE_INFINITY;

            if (index >= MAX_CARDS)
                return Number.POSITIVE_INFINITY;

            console.log(index);

            return activePlayer.value.cards[index].year;
        },

        insertAt(index: number, array: unknown[], item: unknown) {
            array.splice(index, 0, item);
        },

        removeAt(index: number, array: unknown[]) {
            return array.splice(index, 1)[0];
        },

        replaceAt(index: number, array: unknown[], item: unknown) {
            array[index] = item;
        },

        switch(oldIndex: number, newIndex: number, array: unknown[]) {
            let x = this.removeAt(oldIndex, array);
            this.insertAt(newIndex, array, x);
        },

        makeRoomInTimeLine() {

            let left = 0;
            let right = 0;

            for (let i = 0; i < MAX_CARDS; i++) {
                if ((activePlayer.value.cards[i]).id !== '') {
                    console.log("FOUND CARD LEFT ", activePlayer.value.cards[i]);
                    left = i;
                    break;
                }
            }

            for (let i = MAX_CARDS - 1; i >= 0; i--) {
                if ((activePlayer.value.cards[i]).id !== '') {
                    console.log("FOUND CARD RIGHT ", activePlayer.value.cards[i]);
                    right = MAX_CARDS - 1 - i;
                    break;
                }
            }

            console.log("LEFT: ", left, "RIGHT: ", right);

            if (left > right) {
                this.removeAt(0, activePlayer.value.cards);
                activePlayer.value.removedAt = 'left';
            }
            else {
                this.removeAt(MAX_CARDS - 1, activePlayer.value.cards);
                activePlayer.value.removedAt = 'right';
            }

            this.insertAt(Math.floor(MAX_CARDS / 2), activePlayer.value.cards, placeHolderCard);

            hitstarCards.value = Array.from({length: MAX_CARDS - 1}, () => placeHolderCard);
            this.insertAt(Math.floor(MAX_CARDS / 2), hitstarCards.value, hitstarCard);
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
            fanfareSound.play();
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
            // activePlayer.value.guessedCardIndex = 4;
            // activePlayer.value.lastGuessedCardIndex = 5;
            Helpers.setNextPlayerAsOnTurn();
            gameCycleStore.setGameState(GameState.ANIMATE_TURNSTART);
            Helpers.drawNewRandomCard();
            newTurnSound.play();

            activePlayerCardsCopy = [...activePlayer.value.cards];

            console.log("CARDS OF PLAYER", playerOnTurn.value.cards.length);

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
            activePlayer.value.guessedCardIndex = Math.floor(MAX_CARDS / 2);
            gameCycleStore.setGameState(gameState);
            Helpers.send(turnMsg(sessionStore.getSessionID(), gameState, activePlayer.value.id));
            // Helpers.saveCopyOfCards();
            Helpers.makeRoomInTimeLine();

            console.log(activePlayer.value.cards);
            // Helpers.getMaxMin();
        },

        /**
         * Moves the card left. Called by a controller.
         */
        moveCardLeft() {

            if (activePlayer.value.guessedCardIndex - 1 < 0) {
                console.log("REACHED LEFT END", activePlayer.value.guessedCardIndex);
                return;
            }

            if (activePlayer.value.cards[activePlayer.value.guessedCardIndex - 1].id === '') {
                console.log("NO CARD AT LEFT", activePlayer.value.guessedCardIndex);
                return;
            }

            cardSwipeSound.play();

            console.log("MOVE CARD LEFT", activePlayer.value.guessedCardIndex);

            Helpers.switch(activePlayer.value.guessedCardIndex-1, activePlayer.value.guessedCardIndex, activePlayer.value.cards);
            Helpers.switch(activePlayer.value.guessedCardIndex, activePlayer.value.guessedCardIndex-1, hitstarCards.value);

            activePlayer.value.guessedCardIndex--;
        },

        /**
         * Moves the card right. Called by a controller.
         */ 
        moveCardRight() {
            if (activePlayer.value.guessedCardIndex + 1 > MAX_CARDS - 1) {
                console.log("REACHED RIGHT END", activePlayer.value.guessedCardIndex);
                return;
            }

            if (activePlayer.value.cards[activePlayer.value.guessedCardIndex + 1].id === '') {
                console.log("NO CARD AT RIGHT", activePlayer.value.guessedCardIndex);
                return;
            }

            cardSwipeSound.play();

            console.log("MOVE CARD RIGHT", activePlayer.value.guessedCardIndex);

            Helpers.switch(activePlayer.value.guessedCardIndex+1, activePlayer.value.guessedCardIndex, activePlayer.value.cards);
            Helpers.switch(activePlayer.value.guessedCardIndex, activePlayer.value.guessedCardIndex+1, hitstarCards.value);

            activePlayer.value.guessedCardIndex++;
        },

        /**
         * Commits the guess. Called by a controller.
         */ 
        commitGuess() {
            console.log("COMMIT GUESS");

            Helpers.replaceAt(activePlayer.value.guessedCardIndex, activePlayer.value.cards, hitstarCard);

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
                doubtCountDown.value = DOUBT_INTERVALL_STEP_NUM;
                popSound.play();
                countDown = setInterval(() => {
                    popSound.play();
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

            // Helpers.removeAt(activePlayer.value.guessedCardIndex, hitstarCards.value);

            clearTimeout(timeOut);
            clearInterval(countDown);
            doubtCountDown.value = 0;
            Helpers.setPlayerAsActive(player);
            Helpers.subtractToken(player);
            gameCycleStore.setGameState(GameState.DOUBT);

            cardSwipeSound.play();
            setTimeout(() => {
                cardSwipeSound.play();
                setTimeout(() => {
                    swordSound.play();
                }, 1000);
            }, 1000);

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
            }, 10)
        },

        evaluateGuess(wasDoubt: boolean) {
            gameCycleStore.setGameState(GameState.EVALUATION);

            cardSwipeSound.play();

            Helpers.replaceAt(activePlayer.value.guessedCardIndex, activePlayer.value.cards, placeHolderCard);

            if (Helpers.getYearOfCard(activePlayer.value.guessedCardIndex - 1) <= currentCard.value.year
                && Helpers.getYearOfCard(activePlayer.value.guessedCardIndex + 1) >= currentCard.value.year
            ) {
                this.evaluatePositive(wasDoubt);
            } else {
                this.evaluateNegative(wasDoubt);
            }
        },

        evaluatePositive(wasDoubt: boolean) {
            console.log('POSITIVE');
            gameCycleStore.setGameState(GameState.ANIMATE_EVALUATION_POSITIVE);

            if (wasDoubt) {
                console.log("WAS DOUBT");
                console.log("PLAYER ON TURN CARDS", playerOnTurn.value.cards);
                console.log("CARDS COPY", activePlayerCardsCopy);

                playerOnTurn.value.cards = [...activePlayerCardsCopy];
                activePlayerCardsCopy = [];
            }

            setTimeout(() => {
                successSound.play();
            }, 2000);
            setTimeout(() => {
                Helpers.replaceAt(activePlayer.value.guessedCardIndex, activePlayer.value.cards, currentCard.value);
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
                Helpers.removeAt(activePlayer.value.guessedCardIndex, activePlayer.value.cards);
                if (activePlayer.value.removedAt === 'left') {
                    Helpers.insertAt(0, activePlayer.value.cards, placeHolderCard);
                } else {
                    Helpers.insertAt(MAX_CARDS - 1, activePlayer.value.cards, placeHolderCard);
                }
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

        async updateGameData(){

            try {
                const user = JSON.parse(localStorage.getItem('user'));
                const token = user ? user.token : null;
                const userId = user ? user.id : null;

                const game = JSON.parse(localStorage.getItem('game'));
                const gameId = game ? game.id : null;
                const creationTime = game ? game.creationTime : null;

                if (!token) {
                    throw new Error('No token found');
                }

                const response = await fetch('http://localhost:8080/game', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        id: gameId,
                        gameUrl: sessionStore.getSessionID(),
                        creationTime: creationTime,
                        endTime: new Date().getTime(),
                        account:{
                            id:userId
                        }
                    }),
                });

                if (!response.ok) {
                    throw new Error('Creating Game failed');
                }
                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.log(error)
            }
        },

        async updatePlayerData() {
            try {
                const game = JSON.parse(localStorage.getItem('game'));
                const gameId = game ? game.id : null;

                const user = JSON.parse(localStorage.getItem('user'));
                const token = user ? user.token : null;

                const sortedPlayers = players.value.sort((a, b) => b.cards.length - a.cards.length);
                let counter =1;

                for(const p of sortedPlayers) {

                    const player = JSON.parse(localStorage.getItem(p.id));
                    const playerId = player ? player.id : null;
                    const playerName = player ? player.playerName : null;
                    const avatatUrl = player ? player.avatarURL : null;
                    const playerRank =counter;

                    const response = await fetch('http://localhost:8080/player', {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({
                            id: playerId,
                            playerName: playerName,
                            avatarURL: avatatUrl,
                            playerRank: playerRank,
                            game:{
                                id:gameId
                            }
                        }),
                    });

                    if (!response.ok) {
                        throw new Error('Updating Player failed');
                    }
                    const data = await response.json();
                    console.log(data);
                    counter ++;
                }
                await router.push('/end')
            } catch (error) {
                console.log(error)
            }

        },

        checkWinner() {

            for (let card of activePlayer.value.cards) {
                if (card.id === '') {
                    return false;
                }
            }
            fanfareSound.play();
            gameCycleStore.setGameState(GameState.GAMEEND);
            setTimeout(() => {
                this.updateGameData();
                this.updatePlayerData();
            }, 5000);
            return true;
        },
    }



    return {
        drawPile,
        discardPile,
        players,
        activePlayer,
        playerOnTurn,
        // getCard: Helpers.getCard,
        // hasCard: Helpers.hasCard,
        doubtCountDown,
        currentCard,
        DRAW_CARD_DURATION,
        SONG_DURATION,
        startGame,
        colors,
        hitstarCards,
    }
});