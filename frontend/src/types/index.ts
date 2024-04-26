export interface Card {
    id: string,
    title: string,
    year: number,
    interpreter: string
}

export interface Player {
    id: PlayerID,
    name: PlayerName,
    icon: IconURL,
    tokens: TokenCount,
    cards: Card[]
}

export enum GameState {
    START_GAME,
    START_TURN,
    WAIT_FOR_DRAW_CARD,
    DRAW_CARD,
    CARD_DREW,
    SHOW_SONG_MENU,
    SORT_CARD,
    WAIT_FOR_CARD_SORTED,
    CARD_SORTED
}

export enum GameStateNew {
    GAMESTART,
    TURNSTART,
    DRAWCARD,
    LISTEN,
    GUESS,
    DOUBT,
    MATEGUESS,
    EVALUATION,
    TURNEND,
    GAMEEND
}

type PlayerID = string;
type PlayerName = string;
type IconURL = string;
type TokenCount = number;

type SessionID = string;
type TopTopic = 'lobby' | 'controller' | 'main' | "#";
//type SubTopic = 'blablabla'
type Topic = `${SessionID}/${TopTopic}`;

type Command = 'left' | 'right' | 'commit' | 'play' | 'pause';

interface Message { // TODO
    senderId: PlayerID | undefined,
    token: string,
    gameState?: GameStateNew,
    command?: Command,//| undefined
    playerName?: PlayerName,
    avatarUrl?: IconURL,
    // lobbyReady benötigt?
    playerOrder?: PlayerID [],
    currentPlayer?: PlayerID,
    currentCardLocalization?: number
    playerRanking?: Player[]
    playerTokens?: TokenCount[]
    evaluationResultActivePlayer?: boolean,
    evaluationResultPassivePlayer?: boolean,
    finishedListening?: boolean,
    doubting?: boolean
}

export interface MQTTMessage {
    topic: Topic,
    message: Message,
}

/**
 * Wird an alle Geräte gesendet, wenn ein Spieler 
 * - der Lobby beitritt
 * - de Änderungen in seinen Avatar und/oder seinen Spielernamen bestätigt
 *
 * qos: 1
 */
let lobbyMsg: MQTTMessage = {
    topic: 'placeholder/lobby',
    message: {
        senderId: 'placeholder',
        token: 'placeholder',
        playerName: 'placeholder',
        avatarUrl: 'placeholder',
    }
}

/**
 * Wird vom Hauptgerät an alle Controller gesendet, wenn der
 * Spiel starten Button gedrückt wird.
 *
 * qos:1
 */
let gameStartMsg: MQTTMessage = {
    topic: 'placeholder/main',
    message: {
        senderId: undefined,
        token: 'placeholder',
        gameState: GameStateNew.GAMESTART,
        playerOrder : ["placeholder1", "placeholder2"],
    }
}

/**
 * Wird vom Hauptgerät an alle Controller gesendet,
 * wenn der nächste Spieler am Zug ist
 *
 * qos: 1
 */
let turnStartMsg: MQTTMessage = {
    topic: 'placeholder/main',
    message: {
        senderId: undefined,
        token: 'placeholder',
        gameState: GameStateNew.TURNSTART,
        currentPlayer:'placeholder'
    }
}

/**
 * Wird vom Hauptgerät an alle Controller gesendet, wenn der
 * nächste Spieler mit Karte ziehen dran ist.
 *
 * qos: 1
 */
let drawCardMsg: MQTTMessage = {
    topic: 'placeholder/main',
    message: {
        senderId: undefined,
        token: 'placeholder',
        gameState: GameStateNew.DRAWCARD,
        currentPlayer:'placeholder'
    }
}

/**
 * Wird vom Controller des aktiven Spielers an das Hauptgerät gesendet, wenn
 * der Spieler das Karte ziehen bestätigt hat.
 *
 * qos:1
 */
let drawConfirmMsg:MQTTMessage ={
    topic: 'placeholder/controller',
    message: {
        senderId: 'placeholder',
        token: 'placeholder',
        gameState: GameStateNew.DRAWCARD,
        command:'commit'
    }
}
/**
 * Wird vom Hauptgerät an alle Controller gesendet,
 * nachdem der aktive Spieler das Karte ziehen an das Hauptgerät bestätigt hat
 *
 * qos: 1
 */
let listenMsg: MQTTMessage = {
    topic: 'placeholder/main',
    message:{
        senderId: undefined,
        token: 'placeholder',
        gameState: GameStateNew.LISTEN,
        currentPlayer:'placeholder'
    }
}

/**
 * Wird vom Controller an das Hauptgerät gesendet,
 * um das Lied abzuspielen bzw. zu pausieren
 */
let playPauseMsg: MQTTMessage = {
    topic: 'placeholder/controller',
    message:{
        senderId: 'placeholder',
        token: 'placeholder',
        gameState: GameStateNew.LISTEN,
        command:'play', // play wenn auf Play gedrückt wird, Pause wenn auf Pause gedrückt wird
        finishedListening : false // True wenn der aktive Spieler
        // den Zuhören beenden Button gedrückt hat, false wenn nicht
    }
}

/**
 *Wird vom Hauptgerät an alle Controller gesendet,
 * wenn das Raten begonnen werden kann
 *
 * qos: 1
 */
let guessMsg: MQTTMessage ={
    topic: 'placeholder/main',
    message: {
        senderId: undefined,
        token: 'placeholder',
        currentPlayer:'placeholder',
        gameState: GameStateNew.GUESS
    }
}


/**
 * Wird von dem Spieler gesendetet, der das eingeloggte auswahl anzweifeln will. Man könnte das an alle (Hauptgerät und Controller) senden um ggf. ein Toast anzuzeigen, wer jetzt gerade anzweifelt
 * qos: 1
 */
let doubtMsg: MQTTMessage ={
    topic: 'placeholder/#',
    message: {
        senderId: undefined,
        token: 'placeholder',
        currentPlayer:'placeholder',
        gameState: GameStateNew.DOUBT,
    }
}
/**
 * Wird vom Hauptgerät an alle Controller gesendet, nachdem der Rateversuch ausgewertet wurde. Das Ergebnis davon wird
 * an die Controller gesendet
 */
let evaluationMsg: MQTTMessage = {
    topic: 'placeholder/main',
    message: {
        senderId: "placeholder",
        token: 'placeholder',
        gameState: GameStateNew.EVALUATION,
        evaluationResultActivePlayer: true, // ture die richtige position erraten wurde
        evaluationResultPassivePlayer: undefined, // false wenn nicht
    }
}
/**
 * Wird von dem Spieler ausgelöst der zuvor angezweifelt hat und nun die Karte neu einsortiert und einloggt.
 */
let commitGuessMsg: MQTTMessage = {
    topic: 'placeholder/controller',
    message: {
        senderId: "placeholder",
        token: 'placeholder',
        gameState: GameStateNew.MATEGUESS | GameStateNew.GUESS,
        command: 'commit',
        currentPlayer: "placeholder",
        currentCardLocalization: 0, //die aktuelle Position von der gezogenen Karte von 0-8 (da max 9 Karten)
        doubting: true //?
    }
}

/**
 * Wird von dem Spieler ausgelöst, der zuvor angezweifelt hat bzw. an der Reihe ist und die Karte nach links bewegt
 */
let leftGuessMsg: MQTTMessage = {
    topic: 'placeholder/controller',
    message: {
        senderId: "placeholder",
        token: 'placeholder',
        gameState: GameStateNew.MATEGUESS | GameStateNew.GUESS,
        command: 'left',
        currentPlayer: "placeholder",
        currentCardLocalization: 0
    }
}

/**
 * Wird von dem Spieler ausgelöst, der zuvor angezweifelt hat und die Karte nach rechts bewegt
 */
let rightGuessMsg: MQTTMessage = {
    topic: 'placeholder/controller',
    message: {
        senderId: "placeholder",
        token: 'placeholder',
        gameState: GameStateNew.MATEGUESS | GameStateNew.GUESS,
        command: 'right',
        currentPlayer: "placeholder",
        currentCardLocalization: 0

    }
}

/**
 * Wird vom Hauptgerät ausgelöst, nachdem die Evaluate-Phase vorbei ist und die Platzierung der Karten geprüft wurde
 */
let turnEndMsg: MQTTMessage = {
    topic: 'placeholder/main',
    message: {
        senderId: undefined,
        token: 'placeholder',
        gameState: GameStateNew.TURNEND,
        currentPlayer: 'placeholder'
    }
}



/**
 * Wird vom Hauptgerät gesendet, wenn das Spiel zu Ende ist
 */
let gameEndMsg: MQTTMessage = {
    topic: 'placeholder/main',
    message: {
        senderId: undefined,
        token: 'placeholder',
        gameState: GameStateNew.GAMEEND,
        playerRanking: undefined,
    }
}




