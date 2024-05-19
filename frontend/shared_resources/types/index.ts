export interface Card {
  id: string;
  title: string;
  year: number;
  interpreter: string;
  position: number; // 1 - 10
}

export interface Player {
  id: PlayerID;
  name: PlayerName;
  iconURL: IconURL;
  tokens: TokenCount;
  cards: Card[];

  guessedCardIndex: number;
  lastGuessedCardIndex: number;
  maxCardIndex: number;
  minCardIndex: number;
}

export enum GameState {
  NOTSTARTED = -1,
  ANIMATE_GAMESTART,
  GAMESTART,
  ANIMATE_TURNSTART,
  TURNSTART,
  DRAWCARD,
  LISTEN,
  GUESS,
  WAIT_FOR_DOUBT,
  DOUBT,
  MATEGUESS,
  ANIMATE_EVALUATION,
  EVALUATION,
  ANIMATE_EVALUATION_POSITIVE,
  ANIMATE_EVALUATION_NEGATIVE,
  TURNEND,
  GAMEEND,
}

type PlayerID = string;
type PlayerName = string;
type IconURL = string;
type TokenCount = number;

type SessionID = string;
type TopTopic = "lobby" | "controller" | "main";
type Topic = `${SessionID}/${TopTopic}`;

type Command = "left" | "right" | "commit" | "play" | "pause";

interface Message {
  senderId: PlayerID | undefined;
  gameState?: GameState;
  command?: Command;
  playerName?: PlayerName;
  avatarUrl?: IconURL;
  // lobbyReady benötigt?
  playerOrder?: Player[];
  currentPlayer?: PlayerID;
  currentCardLocalization?: number;
  playerRanking?: Player[];
  playerTokens?: TokenCount[];
  evaluationResultActivePlayer?: boolean;
  evaluationResultPassivePlayer?: boolean;
  finishedListening?: boolean;
  doubting?: boolean;
  doubtWin?: PlayerID;
  numberOfCards?: number;
}

export interface MQTTMessage {
  topic: Topic;
  message: Message;
}

const playerNames = ["Bananenbrei", "Carl Gustav", "Schwitziger Axel", "Jesus"];
/**
 * Wird an alle Geräte gesendet, wenn ein Spieler
 * - der Lobby beitritt
 * - de Änderungen in seinen Avatar und/oder seinen Spielernamen bestätigt
 *
 * qos: 1
 */
export const lobbyMsg = (sessionId: string, playerId: string): MQTTMessage => {
  return {
    topic: `${sessionId}/lobby`,
    message: {
      senderId: playerId,
      playerName: playerNames[Math.floor(Math.random() * playerNames.length)],
      avatarUrl: `/image${Math.floor(Math.random() * 6) + 1}.png`,
    },
  };
};

/**
 * Wird vom Hauptgerät an alle Controller gesendet, wenn der
 * Spiel starten Button gedrückt wird.
 *
 * qos:1
 */
export const gameStartMsg = (
  sessionId: string,
  players: Player[]
): MQTTMessage => {
  return {
    topic: `${sessionId}/main`,
    message: {
      senderId: undefined,
      gameState: GameState.GAMESTART,
      playerOrder: players,
    },
  };
};

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

export const turnMsg = (
  sessionId: string,
  gameState: GameState,
  currentPlayer: PlayerID
): MQTTMessage => {
  return {
    topic: `${sessionId}/main`,
    message: {
      senderId: undefined,
      gameState: gameState, //TURNSTART, DRAWCARD, GUESS,LISTEN, TURNEND, oder DOUBT
      currentPlayer: currentPlayer,
    },
  };
};

/**
 * Wird vom Hauptgerät gesendet, wenn das Spiel zu Ende ist
 * qos: 1
 */
export const gameEndMsg = (sessionId: string): MQTTMessage => {
  return {
    topic: `${sessionId}/main`,
    message: {
      senderId: undefined,
      gameState: GameState.GAMEEND,
      playerRanking: undefined,
    },
  };
};

/**
 *Wird vom Controller an das Hauptgerät gesendet,
 * um das Lied abzuspielen bzw. zu pausieren
 */
export const playPauseMsg = (
  sessionId: string,
  command: Command,
  playerId: PlayerID
): MQTTMessage => {
  return {
    topic: `${sessionId}/controller`,
    message: {
      senderId: playerId,
      gameState: GameState.LISTEN,
      command: `${command}`, // play wenn auf Play gedrückt wird, Pause wenn auf Pause gedrückt wird
      finishedListening: false, // True wenn der aktive Spieler
      // den Zuhören beenden Button gedrückt hat, false wenn nicht
    },
  };
};

/**
 * Wird von dem Spieler gesendetet, der das eingeloggte auswahl anzweifeln will. Man könnte das an alle (Hauptgerät und Controller) senden um ggf. ein Toast anzuzeigen, wer jetzt gerade anzweifelt
 * qos: 1
 */
export const doubtMsg = (
  sessionId: string,
  playerId: PlayerID,
  currentPlayer: PlayerID
): MQTTMessage => {
  return {
    topic: `${sessionId}/controller`,
    message: {
      senderId: playerId,
      currentPlayer: currentPlayer,
      gameState: GameState.DOUBT,
    },
  };
};

/**
 * Wird vom Hauptgerät an alle Controller gesendet, nachdem der Rateversuch ausgewertet wurde. Das Ergebnis davon wird
 * an die Controller gesendet
 */
export const evaluationMsg = (
  sessionId: string,
  currentPlayer: PlayerID
): MQTTMessage => {
  return {
    topic: `${sessionId}/main`,
    message: {
      senderId: undefined,
      gameState: GameState.EVALUATION,
      currentPlayer: currentPlayer,
      doubtWin: undefined,
      evaluationResultActivePlayer: true, // ture die richtige position erraten wurde
      evaluationResultPassivePlayer: undefined, // false wenn nicht
    },
  };
};
/**
 * Über diese Message werden die verschiedenen Züge während einem MateGuess oder der Guess Phase von Controller aus gesteuert
 */

export const guessMsg = (
  sessionId: string,
  command: Command,
  gameState: GameState,
  playerId: PlayerID,
  currentPlayer: PlayerID
): MQTTMessage => {
  return {
    topic: `${sessionId}/controller`,
    message: {
      senderId: playerId,
      gameState: gameState, //MATEGUESS oder GUESS
      command: command, //left, right, commit
      currentPlayer: currentPlayer,
    },
  };
};

/**
 * Wird vom Controller des aktiven Spielers an das Hauptgerät gesendet, wenn
 * der Spieler das Karte ziehen bestätigt hat.
 *
 * qos:1
 */
export const drawConfirmMsg = (
  sessionId: string,
  playerId: PlayerID
): MQTTMessage => {
  return {
    topic: `${sessionId}/controller`,
    message: {
      senderId: playerId,
      gameState: GameState.DRAWCARD,
      command: "commit",
    },
  };
};
