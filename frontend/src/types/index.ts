export interface Card {
    id: string,
    title: string,
    year: number,
    interpreter: string,
    position: number,       // 1 - 10
    movedDown?: boolean,
    movedUp?: boolean
}

export interface Player {
    id: PlayerID,
    name: PlayerName,
    iconURL: IconURL,
    tokens: TokenCount,
    cards: Card[]
}

export enum GameStateNew {
        NOTSTARTED = -1,
        ANIMATE_GAMESTART,
    GAMESTART,
        ANIMATE_TURNSTART,
    TURNSTART,
    DRAWCARD,
        ANIMATE_LISTEN,
    LISTEN,
    GUESS,
        WAIT_FOR_DOUBT,
    DOUBT,
    MATEGUESS,
        ANIMATE_EVALUATION,
    EVALUATION,
        ANIMATE_EVALUATION_POSITIVE,
        EVALUATION_POSITIVE,
        ANIMATE_EVALUATION_NEGATIVE,
        EVALUATION_NEGATIVE,
    TURNEND,
    GAMEEND
}

type PlayerID = string;
type PlayerName = string;
type IconURL = string;
type TokenCount = number;

type SessionID = string;
type TopTopic = 'lobby' | 'controller' | 'main';
type Topic = `${SessionID}/${TopTopic}`;

type Command = 'left' | 'right' | 'commit' | 'play' | 'pause';

interface Message {
    senderId: PlayerID | undefined,
    token: string,
    gameState?: GameStateNew,
    command?: Command,
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
    doubtWin?: PlayerID
    numberOfCards?: number
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
export const lobbyMsg: MQTTMessage = {
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
export const gameStartMsg: MQTTMessage = {
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
 *
 * ODER
 *
 * Wird vom Hauptgerät an alle Controller gesendet, wenn der
 * nächste Spieler mit Karte ziehen dran ist.
 *
 * qos: 1
 *
 * ODER
 *Wird vom Hauptgerät an alle Controller gesendet,
 * wenn das Raten begonnen werden kann
 *
 * qos: 1
 *
 * ODER
 *
 * Wird vom Hauptgerät an alle Controller gesendet,
 * nachdem der aktive Spieler das Karte ziehen an das Hauptgerät bestätigt hat
 *
 * qos: 1
 *
 * ODER
 *
 * Wird vom Hauptgerät ausgelöst, nachdem die Evaluate-Phase vorbei ist und die Platzierung der Karten geprüft wurde
 * qos: 1
 *
 * ODER
 *
 * Wird vom Hauptgerät gesendet um den Spieler zu ermitteln, der nun Anzweifeln darf.
 *
 */

export const turnMsg = (gameState: GameStateNew): MQTTMessage => {
    return {
        topic: 'placeholder/main',
        message: {
            senderId: undefined,
            token: 'placeholder',
            gameState: gameState, //TURNSTART, DRAWCARD, GUESS,LISTEN, TURNEND, oder DOUBT
            currentPlayer: "placeholder",
        }
    }
}




/**
 * Wird vom Hauptgerät gesendet, wenn das Spiel zu Ende ist
 * qos: 1
 */
export const gameEndMsg: MQTTMessage = {
    topic: 'placeholder/main',
    message: {
        senderId: undefined,
        token: 'placeholder',
        gameState: GameStateNew.GAMEEND,
        playerRanking: undefined,


    }
}



/**
 * Wird vom Controller an das Hauptgerät gesendet,
 * um das Lied abzuspielen bzw. zu pausieren
 */
export const playPauseMsg: MQTTMessage = {
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
 * Wird von dem Spieler gesendetet, der das eingeloggte auswahl anzweifeln will. Man könnte das an alle (Hauptgerät und Controller) senden um ggf. ein Toast anzuzeigen, wer jetzt gerade anzweifelt
 * qos: 1
 */
export const doubtMsg: MQTTMessage ={
    topic: 'placeholder/controller',
    message: {
        senderId: "placeholder",
        token: 'placeholder',
        currentPlayer:'placeholder',
        gameState: GameStateNew.DOUBT,
    }
}

/**
 * Wird vom Hauptgerät an alle Controller gesendet, nachdem der Rateversuch ausgewertet wurde. Das Ergebnis davon wird
 * an die Controller gesendet
 */
export const evaluationMsg: MQTTMessage = {
    topic: 'placeholder/main',
    message: {
        senderId: undefined,
        token: 'placeholder',
        gameState: GameStateNew.EVALUATION,
        currentPlayer: 'placeholder',
        doubtWin: undefined,
        evaluationResultActivePlayer: true, // ture die richtige position erraten wurde
        evaluationResultPassivePlayer: undefined, // false wenn nicht

    }
}
/**
 * Über diese Message werden die verschiedenen Züge während einem MateGuess oder der Guess Phase von Controller aus gesteuert
 */

export const guessMsg = (command: Command, gameState: GameStateNew): MQTTMessage => {
    return {
        topic: 'placeholder/controller',
        message: {
            senderId: "placeholder",
            token: 'placeholder',
            gameState: gameState, //MATEGUESS oder GUESS
            command: command, //left, right, commit
            currentPlayer: "placeholder",
        }
    }
}

/**
 * Wird vom Controller des aktiven Spielers an das Hauptgerät gesendet, wenn
 * der Spieler das Karte ziehen bestätigt hat.
 *
 * qos:1
 */
export const drawConfirmMsg: MQTTMessage = {
    topic: 'placeholder/controller',
    message: {
        senderId: 'placeholder',
        token: 'placeholder',
        gameState: GameStateNew.DRAWCARD,
        command:'commit'
    }
}
